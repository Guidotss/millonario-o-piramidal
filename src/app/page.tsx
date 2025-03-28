import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-slate-800">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mb-6 inline-block rounded-full bg-slate-100 p-3">
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
              className="h-8 w-8 text-slate-800"
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
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl">IdeaDetector 3000</h1>
          <div className="mx-auto mb-6 h-0.5 w-16 bg-slate-200"></div>
          <p className="mb-8 text-xl font-light text-slate-600">
            ¿Tu startup es la próxima unicornio o una estafa con PowerPoint?
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="rounded-full bg-slate-900 px-8 py-6 text-base font-medium tracking-wide text-white transition-all hover:bg-slate-800 hover:shadow-md w-full sm:w-auto"
              >
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-slate-300 px-8 py-6 text-base font-medium tracking-wide text-slate-800 transition-all hover:bg-slate-100 hover:shadow-sm w-full sm:w-auto"
              >
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-16 text-center text-sm text-slate-500">
          <p>Descubre si tu idea vale millones o es solo humo</p>
        </div>
      </div>
    </div>
  )
}

