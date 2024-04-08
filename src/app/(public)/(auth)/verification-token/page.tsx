import { VerificationTokenForm } from './_components/verification-token-form'

export default async function NewVerificationForm({
  searchParams
}: {
  searchParams: { email: string }
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Verifique o seu e-mail
        </h1>
        <p className="text-sm text-muted-foreground">
          Enviamos um código de verificação para {searchParams.email}.
        </p>
      </div>

      <VerificationTokenForm />
    </div>
  )
}
