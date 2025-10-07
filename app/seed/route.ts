import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { users } from '../lib/placeholder-data';
import { products } from '../lib/products';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}

async function ensureCartSchema() {
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
  // carts: 1 per user, keyed by user_id (text to accept either id or email)
  await sql`
    CREATE TABLE IF NOT EXISTS carts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  // cart_items: unique per (cart_id, product_id)
  await sql`
    CREATE TABLE IF NOT EXISTS cart_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL,
      quantity INT NOT NULL CHECK (quantity > 0),
      UNIQUE (cart_id, product_id)
    );
  `;
}

async function seedInventoryFromProducts() {
  // inventory: product_id primary key, stock >= 0
  await sql`
    CREATE TABLE IF NOT EXISTS inventory (
      product_id TEXT PRIMARY KEY,
      stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0)
    );
  `;

  const rows = products
    .filter((p) => typeof p?.id !== 'undefined' && typeof p?.stock === 'number')
    .map((p) => ({ id: String(p.id), stock: p.stock as number }));

  // Upsert all products' stock
  for (const r of rows) {
    // eslint-disable-next-line no-await-in-loop
    await sql`
      INSERT INTO inventory (product_id, stock)
      VALUES (${r.id}, ${r.stock})
      ON CONFLICT (product_id)
      DO UPDATE SET stock = EXCLUDED.stock
    `;
  }

  return rows.length;
}

export async function GET() {
  try {
    await sql.begin(async () => {
      // Users
      await seedUsers();
      // Core schemas for cart
      await ensureCartSchema();
      // Inventory from products
      await seedInventoryFromProducts();
    });
    return Response.json({
      message: 'Database (users, inventory, cart schema) seeded successfully',
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
