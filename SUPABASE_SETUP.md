# Supabase — Setup Admin Panel

Exécute ces requêtes dans **Supabase → SQL Editor → New query**.

---

## 1. Table `products`

```sql
create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  category        text not null default 'gaming',
  category_label  text,
  price           text not null,
  price_label     text,
  hint            text,
  badge           text,
  badge_type      text,
  image_url       text,
  specs           jsonb default '{}',
  contact_subject text,
  cta_label       text default 'Commander',
  sort_order      integer default 0,
  created_at      timestamptz default now()
);
```

---

## 2. Table `admins`

```sql
create table if not exists public.admins (
  email text primary key
);

-- Ajoute ton email admin :
insert into public.admins (email) values ('fsmedia1713@gmail.com');
```

---

## 3. Row Level Security (RLS)

```sql
-- Fonction is_admin() — contourne la récursivité RLS
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins where email = auth.email()
  );
$$;

-- Activer RLS
alter table public.products enable row level security;
alter table public.admins    enable row level security;

-- Lecture publique des produits (site vitrine)
create policy "Public read products"
  on public.products for select
  using (true);

-- Écriture réservée aux admins
create policy "Admin insert products"
  on public.products for insert
  with check (public.is_admin());

create policy "Admin update products"
  on public.products for update
  using (public.is_admin());

create policy "Admin delete products"
  on public.products for delete
  using (public.is_admin());

-- Lecture de la table admins (pour vérifier son propre accès)
create policy "Admin read own row"
  on public.admins for select
  using (email = auth.email());
```

---

## 4. Storage bucket `product-images`

Dans **Supabase → Storage → New bucket** :
- Nom : `product-images`
- Public : **oui**

Puis dans **SQL Editor** :

```sql
-- Lecture publique
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

-- Politique upload (admins seulement)
create policy "Admin upload images"
  on storage.objects for insert
  with check (
    bucket_id = 'product-images'
    and exists (select 1 from public.admins where email = auth.email())
  );

-- Politique lecture publique
create policy "Public read images"
  on storage.objects for select
  using (bucket_id = 'product-images');
```

---

## 5. Import des produits existants

```sql
insert into public.products
  (name, category, category_label, price, price_label, hint, badge, badge_type, image_url, specs, contact_subject, cta_label, sort_order)
values
  (
    'Gaming entrée de gamme', 'gaming', 'Gaming', '600 €', null,
    'La machine idéale pour jouer en 1080p/1440p sans compromis.',
    'Nouveau', 'new', 'images/Gaming entrée de gamme.png',
    '{"CPU":"AMD Ryzen 5 5600X","GPU":"RTX 4060 8 Go","RAM":"16 Go DDR4 3200 MHz","SSD":"512 Go NVMe","Alim":"650W 80+ Bronze"}',
    'Gaming entrée de gamme', 'Commander', 0
  ),
  (
    'Gaming mid gamme', 'gaming', 'Gaming', '999 €', null,
    'La machine idéale pour jouer en 1080p/1440p sans compromis.',
    'Nouveau', 'new', 'images/Gaming mid gamme.png',
    '{"CPU":"AMD Ryzen 5 5600X","GPU":"RTX 4060 8 Go","RAM":"16 Go DDR4 3200 MHz","SSD":"512 Go NVMe","Alim":"650W 80+ Bronze"}',
    'Gaming mid gamme', 'Commander', 1
  ),
  (
    'Gaming haute gamme', 'gaming', 'Gaming', '1 499 €', null,
    'Performances 4K et ray tracing pour les joueurs exigeants.',
    'Populaire', 'new', 'images/Gaming haute gamme.png',
    '{"CPU":"Intel Core i7-13700K","GPU":"RTX 4070 Ti 12 Go","RAM":"32 Go DDR5 6000 MHz","SSD":"1 To NVMe Gen4","Alim":"850W 80+ Gold"}',
    'Gaming haute gamme', 'Commander', 2
  ),
  (
    'Bureautique', 'bureautique', 'Bureautique', '449 €', null,
    'Fluide et silencieux pour le travail quotidien et le multimédia.',
    null, null, 'images/Bureautique.png',
    '{"CPU":"Intel Core i5-12400","GPU":"Intel UHD 730 (intégré)","RAM":"16 Go DDR4","SSD":"256 Go NVMe","Alim":"400W 80+ Bronze"}',
    'Bureautique', 'Commander', 3
  ),
  (
    'Reconditionné', 'reconditionne', 'Reconditionné', '249 €', 'Reconditionné',
    'Testé, nettoyé et garanti 6 mois. Idéal pour un budget serré.',
    'Bon plan', 'promo', 'images/Reconditionné.png',
    '{"CPU":"Intel Core i5-8500","GPU":"GTX 1650 4 Go","RAM":"16 Go DDR4","SSD":"256 Go SSD","Garantie":"6 mois incluse"}',
    'Reconditionné', 'Réserver', 4
  ),
  (
    'Configuration Personnalisée', 'surmesure', 'Sur mesure', 'Sur devis', null,
    'Vous avez un besoin précis ? On construit exactement ce qu''il vous faut.',
    null, null, 'images/Surmesure.png',
    '{"Approche":"Budget et usages définis avec vous","Composants":"Sélectionnés sur mesure","Assemblage":"Complet avec tests","Livraison":"Sur place ou à domicile"}',
    'Sur mesure', 'Demander un devis', 5
  );
```

---

## 6. Accès à l'admin

Va sur `ton-site.com/admin.html` — connecte-toi avec l'email que tu as mis dans la table `admins`.
