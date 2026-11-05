create extension if not exists pgcrypto;

create type public.visibility as enum ('private', 'public');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  bio text,
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.brew_methods (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  parameter_schema jsonb not null default '{}'::jsonb,
  is_active boolean not null default true
);

create table public.coffee_listings (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references public.profiles(id) on delete set null,
  roaster text,
  name text not null,
  origin text,
  region text,
  producer text,
  variety text,
  process text,
  roast_level text,
  advertised_notes text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.coffee_lots (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid references public.coffee_listings(id) on delete set null,
  personal_name text,
  roast_date date,
  purchased_at date,
  opened_at date,
  bag_size_g numeric(8,2) check (bag_size_g is null or bag_size_g > 0),
  remaining_g numeric(8,2) check (remaining_g is null or remaining_g >= 0),
  price_amount numeric(10,2) check (price_amount is null or price_amount >= 0),
  price_currency char(3),
  storage_notes text,
  private_notes text,
  created_at timestamptz not null default now()
);

create table public.equipment (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  category text not null check (category in ('brewer','grinder','kettle','scale','filter','espresso_machine','accessory','water')),
  brand text,
  model text,
  nickname text,
  settings_notes text,
  created_at timestamptz not null default now()
);

create table public.recipes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  method_id uuid not null references public.brew_methods(id),
  name text not null,
  description text,
  visibility public.visibility not null default 'private',
  current_revision integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.recipe_revisions (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  revision_number integer not null,
  parameters jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique(recipe_id, revision_number)
);

create table public.recipe_steps (
  id uuid primary key default gen_random_uuid(),
  revision_id uuid not null references public.recipe_revisions(id) on delete cascade,
  position integer not null check (position >= 0),
  action text not null,
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  water_g numeric(8,2) check (water_g is null or water_g >= 0),
  instruction text,
  unique(revision_id, position)
);

create table public.brews (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  coffee_lot_id uuid references public.coffee_lots(id) on delete set null,
  method_id uuid not null references public.brew_methods(id),
  recipe_revision_id uuid references public.recipe_revisions(id) on delete set null,
  visibility public.visibility not null default 'private',
  brewed_at timestamptz not null default now(),
  planned_parameters jsonb not null default '{}'::jsonb,
  actual_parameters jsonb not null default '{}'::jsonb,
  recipe_snapshot jsonb,
  notes text,
  created_at timestamptz not null default now()
);

create table public.brew_equipment (
  id uuid primary key default gen_random_uuid(),
  brew_id uuid not null references public.brews(id) on delete cascade,
  equipment_id uuid references public.equipment(id) on delete set null,
  equipment_snapshot jsonb not null default '{}'::jsonb,
  unique (brew_id, equipment_id)
);

create table public.tastings (
  id uuid primary key default gen_random_uuid(),
  brew_id uuid not null references public.brews(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  temperature_stage text,
  aroma_notes text,
  flavour_notes text,
  overall_enjoyment numeric(3,1) check (overall_enjoyment is null or overall_enjoyment between 0 and 10),
  created_at timestamptz not null default now()
);

create table public.tasting_scores (
  tasting_id uuid not null references public.tastings(id) on delete cascade,
  axis text not null check (axis in ('acidity','sweetness','bitterness','body','clarity','balance','aftertaste')),
  score numeric(3,1) not null check (score between 0 and 10),
  primary key (tasting_id, axis)
);

create table public.brew_reflections (
  id uuid primary key default gen_random_uuid(),
  brew_id uuid not null unique references public.brews(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  what_worked text,
  what_to_improve text,
  next_experiment text,
  created_at timestamptz not null default now()
);

create index coffee_lots_owner_idx on public.coffee_lots(owner_id, created_at desc);
create index equipment_owner_idx on public.equipment(owner_id);
create index recipes_owner_idx on public.recipes(owner_id, updated_at desc);
create index brews_owner_time_idx on public.brews(owner_id, brewed_at desc);
create index brews_public_time_idx on public.brews(brewed_at desc) where visibility = 'public';
create index tastings_owner_idx on public.tastings(owner_id, created_at desc);

-- Automatically create a private profile when an auth user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)));
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Enable RLS everywhere. Policies intentionally start owner-only; public read
-- policies will be added with the community release after visibility rules are tested.
alter table public.profiles enable row level security;
alter table public.brew_methods enable row level security;
alter table public.coffee_listings enable row level security;
alter table public.coffee_lots enable row level security;
alter table public.equipment enable row level security;
alter table public.recipes enable row level security;
alter table public.recipe_revisions enable row level security;
alter table public.recipe_steps enable row level security;
alter table public.brews enable row level security;
alter table public.brew_equipment enable row level security;
alter table public.tastings enable row level security;
alter table public.tasting_scores enable row level security;
alter table public.brew_reflections enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Authenticated users can read brew methods" on public.brew_methods for select to authenticated using (true);
create policy "Authenticated users can read coffee listings" on public.coffee_listings for select to authenticated using (true);
create policy "Users can create coffee listings" on public.coffee_listings for insert to authenticated with check (created_by = auth.uid());
create policy "Users can manage own coffee lots" on public.coffee_lots for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "Users can manage own equipment" on public.equipment for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "Users can manage own recipes" on public.recipes for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "Users can manage revisions of own recipes" on public.recipe_revisions for all using (exists (select 1 from public.recipes r where r.id = recipe_id and r.owner_id = auth.uid())) with check (exists (select 1 from public.recipes r where r.id = recipe_id and r.owner_id = auth.uid()));
create policy "Users can manage steps of own recipes" on public.recipe_steps for all using (exists (select 1 from public.recipe_revisions rr join public.recipes r on r.id = rr.recipe_id where rr.id = revision_id and r.owner_id = auth.uid())) with check (exists (select 1 from public.recipe_revisions rr join public.recipes r on r.id = rr.recipe_id where rr.id = revision_id and r.owner_id = auth.uid()));
create policy "Users can manage own brews" on public.brews for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "Users can manage equipment links for own brews" on public.brew_equipment for all using (exists (select 1 from public.brews b where b.id = brew_id and b.owner_id = auth.uid())) with check (exists (select 1 from public.brews b where b.id = brew_id and b.owner_id = auth.uid()));
create policy "Users can manage own tastings" on public.tastings for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "Users can manage scores for own tastings" on public.tasting_scores for all using (exists (select 1 from public.tastings t where t.id = tasting_id and t.owner_id = auth.uid())) with check (exists (select 1 from public.tastings t where t.id = tasting_id and t.owner_id = auth.uid()));
create policy "Users can manage own reflections" on public.brew_reflections for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

insert into public.brew_methods (slug, name) values
  ('moka-pot', 'Moka pot'), ('pour-over', 'Pour-over'), ('french-press', 'French press'),
  ('aeropress', 'AeroPress'), ('espresso', 'Espresso'), ('cold-brew', 'Cold brew')
on conflict (slug) do nothing;
