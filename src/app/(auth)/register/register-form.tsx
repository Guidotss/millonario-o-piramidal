"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useRegister } from "@/lib/hooks/use-register"


export function RegisterForm() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    acceptTerms,
    setAcceptTerms,
    handleRegister,
  } = useRegister()

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Nombre completo
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Juan Pérez"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-11 rounded-md border-slate-200 focus-visible:ring-slate-400"
        />
      </div>
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
        <Label htmlFor="password" className="text-sm font-medium">
          Contraseña
        </Label>
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
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirmar contraseña
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="h-11 rounded-md border-slate-200 focus-visible:ring-slate-400"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={acceptTerms}
          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
        />
        <label
          htmlFor="terms"
          className="text-xs leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Acepto los{" "}
          <Link href="#" className="text-slate-800 hover:underline">
            términos y condiciones
          </Link>
        </label>
      </div>
      <Button
        type="submit"
        className="w-full rounded-md bg-slate-900 py-5 text-base font-medium hover:bg-slate-800"
      >
        Crear cuenta
      </Button>
      <p className="mt-4 text-center text-xs text-slate-500">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="text-slate-800 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  )
} 