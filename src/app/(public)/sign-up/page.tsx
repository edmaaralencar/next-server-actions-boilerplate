import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { SignUpForm } from './_components/sign-up-form'

export default function SignUp() {
  return (
    <div className="flex flex-col gap-4">
      <Button asChild>
        <Link href="/sign-up" className="absolute top-6 right-6">
          Cadastrar
        </Link>
      </Button>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Cadastre-se agora
        </h1>
        <p className="text-sm text-muted-foreground">
          Escreva suas credenciais para criar sua conta!
        </p>
      </div>

      <SignUpForm />
    </div>
  )
}
