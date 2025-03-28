"use server";

import { createSupabaseServerClient } from "@/lib/supabase-client";

export async function upgradeToPro() {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "No hay sesión activa" };
  }

  const { data, error } = await supabase.auth.updateUser({
    data: { plan: "Pro" },
  });

  console.log(data);

  if (error) {
    console.error("Error al actualizar el plan:", error);
    return { error: "Error al actualizar el plan" };
  }

  return { success: true, user: data.user };
}
