import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { products } from '@/app/lib/products';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function ensureInventory(productId: string) {
  const existing = await sql<{ id: string; stock: number }[]>`
    SELECT product_id as id, stock FROM inventory WHERE product_id = ${productId} LIMIT 1
  `;
  if (existing[0]) return existing[0].stock;

  // Lazy init from static products if numeric id matches
  const n = Number.parseInt(productId, 10);
  let initial = 0;
  if (Number.isFinite(n)) {
    const p = products.find((pp) => pp.id === n);
    if (p && typeof p.stock === 'number') initial = p.stock;
  }

  await sql`
    INSERT INTO inventory (product_id, stock)
    VALUES (${productId}, ${initial})
    ON CONFLICT (product_id) DO NOTHING
  `;
  return initial;
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id;
  try {
    const stock = await ensureInventory(productId);
    return NextResponse.json({ stock }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Failed to get stock' }, { status: 500 });
  }
}
