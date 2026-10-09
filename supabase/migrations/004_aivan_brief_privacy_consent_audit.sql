-- Consent for new briefs is recorded by the server. Nullable for historical leads.
alter table public.leads
  add column if not exists privacy_consent_at timestamptz,
  add column if not exists privacy_notice_version text;
comment on column public.leads.privacy_consent_at is 'Server timestamp of affirmative consent from the brief form';
comment on column public.leads.privacy_notice_version is 'Version of the privacy notice shown when submitted';
