-- Remove the SECURITY DEFINER admin helper from exposed API usage.
-- RLS can safely resolve membership through admin_users' own self-only policy.

drop policy if exists "admins_can_read_leads" on public.leads;
create policy "admins_can_read_leads"
on public.leads for select to authenticated
using (
  (select exists (
    select 1 from public.admin_users au
    where au.email = lower(coalesce((select auth.jwt()) ->> 'email',''))
  ))
);

drop policy if exists "admins_can_update_leads" on public.leads;
create policy "admins_can_update_leads"
on public.leads for update to authenticated
using (
  (select exists (
    select 1 from public.admin_users au
    where au.email = lower(coalesce((select auth.jwt()) ->> 'email',''))
  ))
)
with check (
  (select exists (
    select 1 from public.admin_users au
    where au.email = lower(coalesce((select auth.jwt()) ->> 'email',''))
  ))
);

drop policy if exists "admins_can_read_notes" on public.lead_notes;
create policy "admins_can_read_notes"
on public.lead_notes for select to authenticated
using (
  (select exists (
    select 1 from public.admin_users au
    where au.email = lower(coalesce((select auth.jwt()) ->> 'email',''))
  ))
);

drop policy if exists "admins_can_insert_notes" on public.lead_notes;
create policy "admins_can_insert_notes"
on public.lead_notes for insert to authenticated
with check (
  (select exists (
    select 1 from public.admin_users au
    where au.email = lower(coalesce((select auth.jwt()) ->> 'email',''))
  ))
  and author_email = lower(coalesce((select auth.jwt()) ->> 'email',''))
);

drop policy if exists "admins_can_update_notes" on public.lead_notes;
create policy "admins_can_update_notes"
on public.lead_notes for update to authenticated
using (
  (select exists (
    select 1 from public.admin_users au
    where au.email = lower(coalesce((select auth.jwt()) ->> 'email',''))
  ))
)
with check (
  (select exists (
    select 1 from public.admin_users au
    where au.email = lower(coalesce((select auth.jwt()) ->> 'email',''))
  ))
);

drop policy if exists "admins_can_delete_notes" on public.lead_notes;
create policy "admins_can_delete_notes"
on public.lead_notes for delete to authenticated
using (
  (select exists (
    select 1 from public.admin_users au
    where au.email = lower(coalesce((select auth.jwt()) ->> 'email',''))
  ))
);

drop function if exists public.is_aivan_admin();
