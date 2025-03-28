"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login } from "../actions";
import { useUserStore } from "@/store/use-user-store";
import { useToast } from "@/lib/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setSession, setUser } = useUserStore();
  const toast = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { session, error } = await login(email, password);
    if (error) {
      toast.error(error);
    } else {
      setSession(session ?? null);
      if (session?.user) {
        setUser({
          email: session.user.email || "",
          plan: session.user.user_metadata.plan || "Free",
          ideasToday: 0
        });
      }
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <Link
        href="/"
        className="mb-8 text-sm text-slate-500 hover:text-slate-800"
      >
        ← Volver al inicio
      </Link>
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="space-y-1">
          <div className="mx-auto mb-2">
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
              className="h-6 w-6 text-slate-800"
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
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Iniciar sesión
          </CardTitle>
          <CardDescription className="text-center">
            Ingresa tus datos para usar IdeaDetector 3000
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-md border-slate-200 focus-visible:ring-slate-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
                <Link
                  href="#"
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 rounded-md border-slate-200 focus-visible:ring-slate-400"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            className="w-full rounded-md bg-slate-900 py-5 text-base font-medium hover:bg-slate-800"
            onClick={handleLogin}
          >
            Iniciar sesión
          </Button>
          <p className="mt-4 text-center text-xs text-slate-500">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-slate-800 hover:underline">
              Regístrate
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
