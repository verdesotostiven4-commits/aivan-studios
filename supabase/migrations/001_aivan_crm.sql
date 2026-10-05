create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  email text primary key check (email = lower(email)),
  display_name text,
  role text not null default 'admin' check (role in ('admin','editor')),
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  industry text,
  product_focus text,
  goal text,
  challenge text,
  service text not null default 'no-se' check (service in ('aibrand','aimark','aiprod','aipacks','no-se')),
  budget text,
  networks text[] not null default '{}',
  contact_name text not null,
  email text,
  phone text,
  city text,
  website text,
  source text not null default 'website',
  status text not null default 'nuevo' check (status in ('nuevo','revision','contactado','reunion','propuesta','cliente','cerrado','descartado')),
  last_contacted_at timestamptz,
  utm jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint leads_contact_required check (
    nullif(trim(coalesce(email,'')), '') is not null or
    nullif(trim(coalesce(phone,'')), '') is not null
  )
);

create table if not exists public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  author_email text,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_service_idx on public.leads(service);
create index if not exists lead_notes_lead_id_idx on public.lead_notes(lead_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at before update on public.leads
for each row execute function public.set_updated_at();

create or replace function public.is_aivan_admin()
returns boolean language sql stable security definer
set search_path = public, pg_temp as $$
  select exists (
    select 1 from public.admin_users au
    where au.email = lower(coalesce(auth.jwt() ->> 'email',''))
  );
$$;

alter table public.admin_users enable row level security;
alter table public.leads enable row level security;
alter table public.lead_notes enable row level security;

revoke all on public.admin_users from anon, authenticated;
revoke all on public.leads from anon, authenticated;
revoke all on public.lead_notes from anon, authenticated;
grant select on public.admin_users to authenticated;
grant select, update on public.leads to authenticated;
grant select, insert, update, delete on public.lead_notes to authenticated;

create policy "admins_can_see_themselves"
on public.admin_users for select to authenticated
using (email = lower(coalesce(auth.jwt() ->> 'email','')));

create policy "admins_can_read_leads"
on public.leads for select to authenticated
using (public.is_aivan_admin());

create policy "admins_can_update_leads"
on public.leads for update to authenticated
using (public.is_aivan_admin())
with check (public.is_aivan_admin());

create policy "admins_can_read_notes"
on public.lead_notes for select to authenticated
using (public.is_aivan_admin());

create policy "admins_can_insert_notes"
on public.lead_notes for insert to authenticated
with check (public.is_aivan_admin());

create policy "admins_can_update_notes"
on public.lead_notes for update to authenticated
using (public.is_aivan_admin())
with check (public.is_aivan_admin());

create policy "admins_can_delete_notes"
on public.lead_notes for delete to authenticated
using (public.is_aivan_admin());

do $$ begin
  alter publication supabase_realtime add table public.leads;
exception when duplicate_object then null;
end $$;

do $$ begin
  alter publication supabase_realtime add table public.lead_notes;
exception when duplicate_object then null;
end $$;
