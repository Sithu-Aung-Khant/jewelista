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

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id || session?.user?.email;
  if (!userId) return NextResponse.json({ items: [] }, { status: 200 });

  const cartId = await ensureCart(String(userId));
  const items = await sql<{ product_id: string; quantity: number }[]>`
    SELECT product_id, quantity FROM cart_items WHERE cart_id = ${cartId}
  `;
  return NextResponse.json({ items }, { status: 200 });
}

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id || session?.user?.email;
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  const input: Array<{ productId: string; quantity: number }> = Array.isArray(
    body
  )
    ? body
    : [];

  const cartId = await ensureCart(String(userId));

  for (const { productId, quantity } of input) {
    if (!productId || !Number.isFinite(quantity)) continue;
    await sql`
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES (${cartId}, ${String(productId)}, ${quantity})
      ON CONFLICT (cart_id, product_id)
      DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
    `;
  }

  const items = await sql<{ product_id: string; quantity: number }[]>`
    SELECT product_id, quantity FROM cart_items WHERE cart_id = ${cartId}
  `;
  return NextResponse.json({ items }, { status: 200 });
}

export async function DELETE() {
  const session = await auth();
  const userId = session?.user?.id || session?.user?.email;
  if (!userId)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const cartId = await ensureCart(String(userId));
  await sql`DELETE FROM cart_items WHERE cart_id = ${cartId}`;
  return NextResponse.json({ items: [] }, { status: 200 });
}
