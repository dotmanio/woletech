# Woletech Gadgets — Website

A full website for Woletech Gadgets: a marketing homepage, a live product
catalog, and an admin dashboard where stock can be added/edited/removed —
no coding needed after setup.

**Stack (100% free tier):**
- **Next.js** — the website code
- **GitHub** — stores the code
- **Vercel** — hosts the live site, auto-deploys on every push
- **Supabase** — free database (products), auth (admin login), and image storage

---

## 1. Set up Supabase (the database)

1. Go to **[supabase.com](https://supabase.com)** → sign up free → **New Project**.
   - Pick any name (e.g. `woletech-gadgets`), set a database password (save it
     somewhere), pick a region close to Nigeria (e.g. `eu-west` / London).
2. Once the project is ready, go to **SQL Editor** → **New query**.
3. Open `supabase/schema.sql` from this project, copy **all of it**, paste it
   into the SQL editor, and click **Run**.
   - This creates the `products` table, sets up permissions, creates the
     image storage bucket, and adds 6 placeholder products so the site isn't
     empty on first load.
4. Go to **Project Settings → API**. You'll need two values for step 3 below:
   - **Project URL**
   - **anon public** key
5. Create the admin login: go to **Authentication → Users → Add user**.
   - Enter an email and password for whoever will manage stock (e.g. the
     shop owner). This is what's used to log in at `/admin/login`.
   - Tick **Auto Confirm User** so no email verification step is needed.

## 2. Put the code on GitHub

1. Create a new repository on [github.com](https://github.com) (e.g.
   `woletech-gadgets`), keep it private or public, don't add a README.
2. From inside this project folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/woletech-gadgets.git
   git push -u origin main
   ```

## 3. Deploy on Vercel

1. Go to **[vercel.com](https://vercel.com)** → sign up free with GitHub.
2. **Add New → Project** → import the `woletech-gadgets` repo.
3. Before clicking Deploy, open **Environment Variables** and add:
   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | the Project URL from Supabase step 4 |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | the anon public key from Supabase step 4 |
4. Click **Deploy**. After ~1 minute the site is live at a `*.vercel.app`
   address (you can add a custom domain later for free in Vercel's settings,
   you'd just need to buy the domain name itself separately).

**From now on:** any time code is pushed to the `main` branch on GitHub,
Vercel automatically redeploys. Day-to-day stock changes don't need this —
see below.

---

## 4. Day-to-day: adding/removing stock (no coding)

Go to **yoursite.vercel.app/admin/login**, log in with the email/password
created in Supabase step 5. From the dashboard:

- **Add Product** — upload a photo, name, price, category, condition, optional notes.
- **Edit (pencil icon)** — update price or details any time.
- **In stock / Sold out toggle** — tap to mark something unavailable without deleting it.
- **Delete (trash icon)** — remove a listing permanently.

Changes appear on the live site within seconds — no redeploying needed.

---

## 5. Updating business info (name, phone, address, etc.)

Site-wide business details live in one file: `src/lib/constants.ts`. Edit
the values there (e.g. `whatsappNumber`, `phone1`, `address`), then:
```bash
git add .
git commit -m "Update business info"
git push
```
Vercel redeploys automatically within a minute.

> **WhatsApp number format:** must be the full international number with no
> `+`, spaces, or leading `0` — e.g. Nigerian `0701 804 6411` becomes
> `2347018046411`.

---

## 6. Local development (optional, for further changes)

```bash
npm install
cp .env.local.example .env.local   # then fill in your Supabase values
npm run dev
```
Visit `http://localhost:3000`.

---

## Project structure

```
src/app/                 pages (home, /products, /admin/login, /admin/dashboard)
src/components/          reusable UI (header, hero, product cards, etc.)
src/components/admin/    admin-only UI (product form, dashboard header)
src/lib/constants.ts     business info — name, contact, services, categories
src/lib/supabase/        Supabase client setup
supabase/schema.sql      database schema — run once in Supabase SQL Editor
```
