create extension if not exists "pgcrypto";

create table public.routes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamptz default now(),
  created_by text default 'admin'
);

create table public.route_participants (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references public.routes(id) on delete cascade,
  user_id text not null,
  display_name text not null default 'Anónimo',
  created_at timestamptz default now()
);

create unique index route_participants_unique
  on public.route_participants(route_id, user_id);

alter table public.routes enable row level security;
alter table public.route_participants enable row level security;

create policy "Anyone can read routes"
on public.routes
for select
using (true);

create policy "No anon inserts routes"
on public.routes
for insert
with check (false);

create policy "Anyone can read route participants"
on public.route_participants
for select
using (true);

create policy "Anyone can insert participants"
on public.route_participants
for insert
with check (true);

create policy "Anyone can delete participants"
on public.route_participants
for delete
using (true);
