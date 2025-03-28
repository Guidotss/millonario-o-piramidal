"use server";

import { env } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase-client";

interface AnalysisResult {
  classification: "MILLONARIA" | "PIRAMIDAL";
  explanation: string;
}

export async function analyzeIdea(idea: string): Promise<AnalysisResult> {
  if (!env.OPENAI_API_KEY) {
    throw new Error(
      "La API Key de OpenAI no está configurada. Por favor, agrégala en tu archivo .env"
    );
  }

  const response = await fetch(env.OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Eres un analista de startups que solo responde con clasificación y explicaciones graciosas.",
        },
        {
          role: "user",
          content: `Clasifica esta idea de startup como "MILLONARIA" o "PIRAMIDAL" y da una explicación graciosa: ${idea}`,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error(
      `Error al llamar a la API de OpenAI: ${response.statusText}`
    );
  }

  const data = await response.json();
  const messageContent =
    data.choices[0]?.message?.content?.trim() ||
    "No se pudo generar una respuesta.";

  const isMillionDollarIdea = messageContent
    .toLowerCase()
    .includes("millonaria");

  const result: AnalysisResult = {
    classification: isMillionDollarIdea ? "MILLONARIA" : "PIRAMIDAL",
    explanation: messageContent,
  };

  return result;
}

export async function getCurrentUser() {
  const supabase = createSupabaseServerClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return { error: "No hay sesión activa" };
  }

  return { 
    user: {
      email: user.email || "",
      plan: user.user_metadata.plan || "Free"
    }
  };
}
