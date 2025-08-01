import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Create a singleton Supabase client for client-side operations
  // This prevents multiple client instances from being created
  // which can lead to issues with authentication state.
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
