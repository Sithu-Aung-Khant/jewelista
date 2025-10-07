import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { auth } from '@/auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id || session?.user?.email;
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId, quantity } = await req.json();
  if (!productId || !Number.isFinite(quantity) || quantity <= 0) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  try {
    await sql.begin(async (trx) => {
      const cartId = await (async () => {
        const existing = await trx<{ id: string }[]>`
          SELECT id FROM carts WHERE user_id = ${String(userId)} LIMIT 1
        `;
        if (existing[0]) return existing[0].id;
        const created = await trx<{ id: string }[]>`
          INSERT INTO carts (user_id) VALUES (${String(userId)}) RETURNING id
        `;
        return created[0].id;
      })();

      const inv = await trx<{ stock: number }[]>`
        SELECT stock FROM inventory WHERE product_id = ${String(
          productId
        )} FOR UPDATE
      `;
      const currentStock = inv[0]?.stock ?? 0;
      if (currentStock < quantity) {
        throw new Error('Insufficient stock');
      }
      await trx`
        UPDATE inventory SET stock = stock - ${quantity} WHERE product_id = ${String(
        productId
      )}
      `;

      await trx`
        INSERT INTO cart_items (cart_id, product_id, quantity)
        VALUES (${cartId}, ${String(productId)}, ${quantity})
        ON CONFLICT (cart_id, product_id)
        DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
      `;
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Insufficient stock' }, { status: 409 });
  }
}

export async function PATCH(req: Request) {
  const session = await auth();
  const userId = session?.user?.id || session?.user?.email;
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId, quantity } = await req.json();
  if (!productId || !Number.isFinite(quantity)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  try {
    await sql.begin(async (trx) => {
      const cart = await trx<{ id: string }[]>`
        SELECT id FROM carts WHERE user_id = ${String(userId)} LIMIT 1
      `;
      if (!cart[0]) return; // no-op
      const cartId = cart[0].id;

      const existing = await trx<{ quantity: number }[]>`
        SELECT quantity FROM cart_items WHERE cart_id = ${cartId} AND product_id = ${String(
        productId
      )} FOR UPDATE
      `;
      const prevQty = existing[0]?.quantity ?? 0;

      if (quantity <= 0) {
        if (prevQty > 0) {
          await trx`
            UPDATE inventory SET stock = stock + ${prevQty} WHERE product_id = ${String(
            productId
          )}
          `;
        }
        await trx`DELETE FROM cart_items WHERE cart_id = ${cartId} AND product_id = ${String(
          productId
        )}`;
      } else {
        const delta = quantity - prevQty;
        if (delta > 0) {
          const inv = await trx<{ stock: number }[]>`
            SELECT stock FROM inventory WHERE product_id = ${String(
              productId
            )} FOR UPDATE
          `;
          const currentStock = inv[0]?.stock ?? 0;
          if (currentStock < delta) throw new Error('Insufficient stock');
          await trx`
            UPDATE inventory SET stock = stock - ${delta} WHERE product_id = ${String(
            productId
          )}
          `;
        } else if (delta < 0) {
          await trx`
            UPDATE inventory SET stock = stock + ${-delta} WHERE product_id = ${String(
            productId
          )}
          `;
        }
        await trx`
          UPDATE cart_items SET quantity = ${quantity}
          WHERE cart_id = ${cartId} AND product_id = ${String(productId)}
        `;
      }
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Insufficient stock' }, { status: 409 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  const userId = session?.user?.id || session?.user?.email;
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId } = await req.json();
  if (!productId)
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

  await sql.begin(async (trx) => {
    const cart = await trx<{ id: string }[]>`
      SELECT id FROM carts WHERE user_id = ${String(userId)} LIMIT 1
    `;
    if (!cart[0]) return;
    const cartId = cart[0].id;
    const existing = await trx<{ quantity: number }[]>`
      SELECT quantity FROM cart_items WHERE cart_id = ${cartId} AND product_id = ${String(
      productId
    )} FOR UPDATE
    `;
    const prevQty = existing[0]?.quantity ?? 0;
    if (prevQty > 0) {
      await trx`
        UPDATE inventory SET stock = stock + ${prevQty} WHERE product_id = ${String(
        productId
      )}
      `;
      await trx`DELETE FROM cart_items WHERE cart_id = ${cartId} AND product_id = ${String(
        productId
      )}`;
    }
  });
  return NextResponse.json({ ok: true }, { status: 200 });
}
