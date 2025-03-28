"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RegisterForm } from "./register-form"

export default function Register() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <Link href="/" className="mb-8 text-sm text-slate-500 hover:text-slate-800">
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
          <CardTitle className="text-center text-2xl font-bold">Crear cuenta</CardTitle>
          <CardDescription className="text-center">Regístrate para comenzar a usar IdeaDetector 3000</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  )
}

