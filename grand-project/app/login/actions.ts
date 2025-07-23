"use server";

import { supabaseClient } from "@/api/lib/supabaseClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type SignInState = {
  success: boolean;
  message: string;
} | null;

export async function signInWithMagicLink(
  prevState: SignInState,
  formData: FormData
): Promise<SignInState> {
  const email = formData.get("email") as string;
  if (!email) {
    return { success: false, message: "Email is required." };
  }
  const supabase = supabaseClient;
  const origin = (await headers()).get("origin");
  const redirectTo = `${origin}/dashboard`;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });
  if (error) {
    console.error("Supabase sign-in error:", error.message);
    return { success: false, message: error.message };
  }
  return { success: true, message: "Check your email for the magic link!" };
}

export async function signOut() {
  const supabase = supabaseClient;
  await supabase.auth.signOut();
  return redirect("/login");
}
