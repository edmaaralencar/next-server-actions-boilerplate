import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { SignInForm } from './_components/sign-in-form'

export default function SignIn() {
  return (
    <div className="flex flex-col gap-4">
      <Button asChild>
        <Link href="/sign-in" className="absolute top-6 right-6">
          Entrar
        </Link>
      </Button>
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Entre agora</h1>
        <p className="text-sm text-muted-foreground">
          Escreva suas credenciais para fazer entrar!
        </p>
      </div>

      <SignInForm />
    </div>
  )
}
