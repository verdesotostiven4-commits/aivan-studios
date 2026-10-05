import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient<any, "public", any> | null = null;

export function getBrowserSupabase(): SupabaseClient<any, "public", any> | null {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  client = createClient<any>(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return client;
}
