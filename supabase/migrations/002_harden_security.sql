-- Security and policy hardening for the AIVAN internal CRM.
create or replace function public.set_updated_at()
returns trigger language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.is_aivan_admin() from public, anon;
grant execute on function public.is_aivan_admin() to authenticated;

drop policy if exists "admins_can_see_themselves" on public.admin_users;
create policy "admins_can_see_themselves"
on public.admin_users for select to authenticated
using (email = lower(coalesce((select auth.jwt()) ->> 'email','')));

drop policy if exists "admins_can_insert_notes" on public.lead_notes;
create policy "admins_can_insert_notes"
on public.lead_notes for insert to authenticated
with check (
  public.is_aivan_admin()
  and author_email = lower(coalesce((select auth.jwt()) ->> 'email',''))
);
