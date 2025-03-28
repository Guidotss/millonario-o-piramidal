import { useState } from "react"
import { useRouter } from "next/navigation"
import { register } from "@/app/(auth)/actions"
import { useToast } from "./use-toast"

export function useRegister() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { error } = await register(name, email, password)
      if (error) {
        toast.error(error)
      } else {
        toast.success("Cuenta creada exitosamente")
        router.push("/login")
      }
    } catch (error) {
      console.error("Error al registrar:", error)
      toast.error("Error al crear la cuenta")
    }
  }

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    acceptTerms,
    setAcceptTerms,
    handleRegister,
  }
}