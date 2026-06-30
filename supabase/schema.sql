-- ═══════════════════════════════════════════════════════════════════════
-- Woletech Gadgets — Supabase setup
-- Run this whole file once in: Supabase Dashboard → SQL Editor → New query
-- ═══════════════════════════════════════════════════════════════════════

-- 1. Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric not null default 0,
  category text not null,
  condition text,
  image_url text,
  description text,
  in_stock boolean not null default true,
  created_at timestamptz not null default now()
);

-- 2. Row Level Security
alter table products enable row level security;

-- Anyone (including visitors with no login) can VIEW products.
create policy "Public can view products"
  on products for select
  to anon, authenticated
  using (true);

-- Only logged-in users (the admin account you create) can add products.
create policy "Authenticated users can insert products"
  on products for insert
  to authenticated
  with check (true);

-- Only logged-in users can edit products.
create policy "Authenticated users can update products"
  on products for update
  to authenticated
  using (true);

-- Only logged-in users can delete products.
create policy "Authenticated users can delete products"
  on products for delete
  to authenticated
  using (true);

-- 3. Storage bucket for product photos
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public can view product images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'product-images');

create policy "Authenticated users can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Authenticated users can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');

-- 4. A few starter rows so the catalog isn't empty on first deploy.
-- (Replace/delete these from the admin dashboard once real stock is added.)
insert into products (name, price, category, condition, in_stock, description)
values
  ('iPhone 13 Pro', 450000, 'Phones', 'UK Used', true, 'Placeholder listing — update with real details from the admin dashboard.'),
  ('Samsung Galaxy A54', 280000, 'Phones', 'New', true, 'Placeholder listing — update with real details from the admin dashboard.'),
  ('HP EliteBook 840', 320000, 'Laptops', 'UK Used', true, 'Placeholder listing — update with real details from the admin dashboard.'),
  ('JBL Charge 5', 95000, 'Speakers', 'New', true, 'Placeholder listing — update with real details from the admin dashboard.'),
  ('Fast Charger + Cable', 8500, 'Accessories', 'New', true, 'Placeholder listing — update with real details from the admin dashboard.'),
  ('PS5 Console', 750000, 'Games & Console', 'New', true, 'Placeholder listing — update with real details from the admin dashboard.');
