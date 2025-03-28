"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  CreditCard,
  Sparkles,
  ArrowLeft,
  Check,
} from "lucide-react";
import { useUserStore } from "@/store/use-user-store";
import { upgradeToPro } from "./actions";
import { useToast } from "@/lib/hooks/use-toast";

export default function ProPage() {
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { session, setUser } = useUserStore();
  const toast = useToast();

  const handleUpgrade = () => {
    setShowModal(true);
  };

  const processPayment = async () => {
    setProcessing(true);
    try {
      const { user, error } = await upgradeToPro();

      if (error) {
        toast.error(error);
        setProcessing(false);
        return;
      }

      setSuccess(true);
      if (session) {
        setUser({
          email: user?.email || "",
          plan: "Pro",
          ideasToday: 0
        });
      }

      setTimeout(() => {
        setShowModal(false);
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      toast.error("Error al procesar el pago");
    } finally {
      setProcessing(false);
    }
  };

  if (!session) return null;

  const user = {
    email: session.user.email || "",
    plan: session.user.user_metadata.plan || "Free",
  };

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
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <ArrowLeft className="mr-1 h-3 w-3" /> Volver al dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Actualiza a Pro
          </h2>
          <p className="mt-2 text-slate-600">
            Desbloquea todo el potencial de IdeaDetector 3000
          </p>
        </div>

        <div className="mx-auto max-w-md">
          <Card className="overflow-hidden border-none shadow-lg">
            <div className="absolute right-4 top-4">
              <Badge className="bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                Recomendado
              </Badge>
            </div>
            <CardHeader className="border-b border-slate-100 bg-slate-50 pb-6">
              <CardTitle className="flex items-center justify-center text-2xl font-bold">
                <Sparkles className="mr-2 h-5 w-5 text-yellow-500" />
                Plan Pro
              </CardTitle>
              <CardDescription className="text-center text-slate-600">
                Análisis ilimitados y características premium
              </CardDescription>
              <div className="mt-4 text-center">
                <span className="text-4xl font-bold text-slate-900">$9.99</span>
                <span className="text-slate-600">/mes</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-emerald-500" />
                  <span className="text-slate-700">
                    <span className="font-medium">Análisis ilimitados</span> -
                    Evalúa todas las ideas que quieras
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-emerald-500" />
                  <span className="text-slate-700">
                    <span className="font-medium">
                      Explicaciones detalladas
                    </span>{" "}
                    - Obtén insights más profundos
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-emerald-500" />
                  <span className="text-slate-700">
                    <span className="font-medium">Estadísticas avanzadas</span>{" "}
                    - Compara con ideas exitosas
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-3 h-5 w-5 text-emerald-500" />
                  <span className="text-slate-700">
                    <span className="font-medium">Soporte prioritario</span> -
                    Ayuda cuando la necesites
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col border-t border-slate-100 bg-slate-50 px-6 py-6">
              <Button
                onClick={handleUpgrade}
                className="w-full bg-slate-900 py-6 text-base font-medium hover:bg-slate-800"
                disabled={user.plan === "Pro"}
              >
                {user.plan === "Pro" ? "Ya tienes Pro" : "Actualizar ahora"}
              </Button>
              <p className="mt-4 text-center text-xs text-slate-500">
                Sin compromiso, cancela cuando quieras
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Completar pago
            </DialogTitle>
            <DialogDescription className="text-center">
              Ingresa tus datos de pago para actualizar a Pro
            </DialogDescription>
          </DialogHeader>

          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 rounded-full bg-emerald-100 p-3">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">
                ¡Felicidades, ahora sos Pro!
              </h3>
              <p className="text-slate-600">
                Tu cuenta ha sido actualizada exitosamente
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-6 py-4">
                <div className="grid gap-4">
                  <div className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center">
                      <CreditCard className="mr-3 h-5 w-5 text-slate-600" />
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">
                          Tarjeta de crédito
                        </div>
                        <div className="text-sm text-slate-500">
                          **** **** **** 4242
                        </div>
                      </div>
                      <div className="h-5 w-5 rounded-full border border-slate-200 bg-slate-50"></div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 opacity-50">
                    <div className="flex items-center">
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
                        className="mr-3 h-5 w-5 text-slate-600"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">
                          Otros métodos de pago
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="sm:justify-center">
                <Button
                  onClick={processPayment}
                  className="w-full bg-slate-900 py-6 text-base font-medium hover:bg-slate-800"
                  disabled={processing}
                >
                  {processing ? "Procesando..." : "Pagar $9.99"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Badge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
