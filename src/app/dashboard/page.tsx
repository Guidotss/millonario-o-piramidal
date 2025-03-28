"use client";

import { useState, useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Rocket,
  TrendingDown,
  Lightbulb,
  ArrowRight,
  Lock,
} from "lucide-react";
import { analyzeIdea, getCurrentUser } from "./actions";
import { useUserStore } from "@/store/use-user-store";
import { logout } from "@/app/(auth)/actions";
import { useToast } from "@/lib/hooks/use-toast";

export default function Dashboard() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<null | {
    type: "success" | "fail";
    message: string;
  }>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    session,
    logout: logoutStore,
    user,
    incrementIdeasToday,
    setUser,
  } = useUserStore();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      logoutStore();
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    if (!session) {
      router.replace("/login");
      return;
    }

    const refreshUserData = async () => {
      const { user: updatedUser, error } = await getCurrentUser();
      if (error) {
        toast.error(error);
        return;
      }
      if (updatedUser) {
        setUser({
          ...updatedUser,
          ideasToday: user?.ideasToday || 0
        });
      }
    };

    refreshUserData();
  }, [router]);

  const handleAnalyzeIdea = () => {
    if (user?.plan === "Free" && user.ideasToday >= 1) {
      toast.error(
        "Has alcanzado el límite de ideas para el plan Free. Actualiza a Pro para análisis ilimitados."
      );
      return;
    }

    setLoading(true);

    startTransition(async () => {
      try {
        const analysis = await analyzeIdea(idea);
        setResult({
          type: analysis.classification === "MILLONARIA" ? "success" : "fail",
          message: analysis.explanation,
        });
        if (user?.plan === "Free") {
          incrementIdeasToday();
        }
      } catch (error) {
        console.error("Error al analizar la idea:", error);
        setResult({
          type: "fail",
          message: "Hubo un error al analizar la idea. Intenta nuevamente.",
        });
      } finally {
        setLoading(false);
      }
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100">
        <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-slate-800"
            >
              <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
              <path d="M12 3v1"></path>
              <path d="M12 20v1"></path>
              <path d="M3 12h1"></path>
              <path d="M20 12h1"></path>
              <path d="m18.364 5.636-.707.707"></path>
              <path d="m6.343 17.657-.707.707"></path>
              <path d="m5.636 5.636.707.707"></path>
              <path d="m17.657 17.657.707.707"></path>
            </svg>
            <h1 className="text-lg font-semibold text-slate-800">
              IdeaDetector 3000
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant={user.plan === "Pro" ? "default" : "outline"}
              className={
                user.plan === "Pro"
                  ? "bg-slate-900 text-white"
                  : "border-slate-200 text-slate-700"
              }
            >
              {user.plan === "Pro" ? (
                <>
                  <Sparkles className="mr-1 h-3 w-3" /> Plan Pro
                </>
              ) : (
                <>
                  <Lock className="mr-1 h-3 w-3" /> Plan Free
                </>
              )}
            </Badge>
            {user.plan !== "Pro" && (
              <Link href="/pro">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  <Sparkles className="mr-1 h-3 w-3" /> Actualizar
                </Button>
              </Link>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogout}
              className="h-8 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="mb-8 overflow-hidden border-none bg-slate-50 shadow-sm">
          <CardHeader className="bg-slate-100 pb-3">
            <CardTitle className="flex items-center text-lg font-medium">
              <Lightbulb className="mr-2 h-4 w-4 text-slate-700" />
              Analiza tu idea de startup
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              Descubre si tu idea revolucionará el mundo o si deberías seguir en
              tu trabajo actual
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Textarea
              placeholder="Describe tu idea de startup aquí... Por ejemplo: 'Una app que usa blockchain para vender agua embotellada'"
              className="min-h-32 resize-none border-slate-200 text-slate-700 placeholder:text-slate-400 focus-visible:ring-slate-400"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex items-center justify-between bg-slate-50 px-6 py-4">
            {user.plan === "Free" && (
              <div className="text-xs text-slate-500">
                Ideas restantes hoy: {Math.max(0, 1 - user.ideasToday)}/1
              </div>
            )}
            <Button
              onClick={handleAnalyzeIdea}
              disabled={
                loading ||
                !idea.trim() ||
                (user.plan === "Free" && user.ideasToday >= 1)
              }
              className="bg-slate-900 text-sm font-medium hover:bg-slate-800"
            >
              {loading ? (
                "Analizando..."
              ) : user.plan === "Free" && user.ideasToday >= 1 ? (
                <>
                  Límite alcanzado <Lock className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Analizar idea <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {result && (
          <Card
            className={`border-none shadow-sm ${
              result.type === "success" ? "bg-emerald-50" : "bg-amber-50"
            }`}
          >
            <CardHeader
              className={`pb-3 ${
                result.type === "success"
                  ? "bg-emerald-100/50"
                  : "bg-amber-100/50"
              }`}
            >
              <CardTitle
                className={`flex items-center text-lg font-medium ${
                  result.type === "success"
                    ? "text-emerald-800"
                    : "text-amber-800"
                }`}
              >
                {result.type === "success" ? (
                  <>
                    <Rocket className="mr-2 h-5 w-5" />
                    🚀 ¡MILLONARIA!
                  </>
                ) : (
                  <>
                    <TrendingDown className="mr-2 h-5 w-5" />
                    💸 ESTAFA PIRAMIDAL
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p
                className={`text-base ${
                  result.type === "success"
                    ? "text-emerald-700"
                    : "text-amber-700"
                }`}
              >
                {result.message}
              </p>
            </CardContent>
            <CardFooter
              className={`border-t ${
                result.type === "success"
                  ? "border-emerald-100 bg-emerald-50"
                  : "border-amber-100 bg-amber-50"
              } px-6 py-4`}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setResult(null)}
                className={`text-xs ${
                  result.type === "success"
                    ? "border-emerald-200 bg-emerald-100/50 text-emerald-700 hover:bg-emerald-100"
                    : "border-amber-200 bg-amber-100/50 text-amber-700 hover:bg-amber-100"
                }`}
              >
                Analizar otra idea
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
}
