import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { auth } from '@/auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function ensureCart(userId: string) {
  const existing = await sql<{ id: string }[]>`
    SELECT id FROM carts WHERE user_id = ${userId} LIMIT 1
  `;
  if (existing[0]) return existing[0].id;
  const created = await sql<{ id: string }[]>`
    INSERT INTO carts (user_id) VALUES (${userId}) RETURNING id
  `;
  return created[0].id;
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id || session?.user?.email;
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId, quantity } = await req.json();
  if (!productId || !Number.isFinite(quantity) || quantity <= 0) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const cartId = await ensureCart(String(userId));
  await sql`
    INSERT INTO cart_items (cart_id, product_id, quantity)
    VALUES (${cartId}, ${String(productId)}, ${quantity})
    ON CONFLICT (cart_id, product_id)
    DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
  `;

  return NextResponse.json({ ok: true }, { status: 200 });
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

  const cartId = await ensureCart(String(userId));

  if (quantity <= 0) {
    await sql`DELETE FROM cart_items WHERE cart_id = ${cartId} AND product_id = ${String(
      productId
    )}`;
  } else {
    await sql`
      UPDATE cart_items
      SET quantity = ${quantity}
      WHERE cart_id = ${cartId} AND product_id = ${String(productId)}
    `;
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function DELETE(req: Request) {
  const session = await auth();
  const userId = session?.user?.id || session?.user?.email;
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { productId } = await req.json();
  if (!productId)
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

  const cartId = await ensureCart(String(userId));
  await sql`DELETE FROM cart_items WHERE cart_id = ${cartId} AND product_id = ${String(
    productId
  )}`;
  return NextResponse.json({ ok: true }, { status: 200 });
}
