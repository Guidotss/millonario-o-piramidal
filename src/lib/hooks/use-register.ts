import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store/use-user-store"
import { register } from "@/app/(auth)/actions"

export function useRegister() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const router = useRouter()
  const { setSession } = useUserStore()
  

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      
      return
    }

    if (password !== confirmPassword) {
      
      return
    }

    if (!acceptTerms) {
      
      return
    }

    const { session, error } = await register(name, email, password)

    if (error) {

      return
    }

    setSession(session ?? null)
    router.push("/dashboard")
  }

  return {
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
  }
}