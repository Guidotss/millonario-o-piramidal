"use server";

import { createSupabaseServerClient } from "@/lib/supabase-client";

export async function register(name: string, email: string, password: string) {
  if (password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres" };
  }

  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { session: data.session, user: data.user };
}

export async function login(email: string, password: string) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }
  
  return { session: data.session, user: data.user };
}

export async function logout() {
  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Error al hacer logout:', error.message)
  }

  return { success: !error }
}

