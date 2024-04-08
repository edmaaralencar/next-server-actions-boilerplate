'use client'

import { toast } from 'sonner'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { useActionForm } from '@/hooks/use-action-form'

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from '@/components/ui/input-otp'
import { validateVerificationTokenSchema } from '@/services/auth-service/validate-verification-token/schema'
import { validateVerificationToken } from '@/services/auth-service/validate-verification-token'

export function VerificationTokenForm() {
  const params = useSearchParams()
  const router = useRouter()
  const email = params.get('email')
  const token = params.get('token')

  const { onSubmit, isPending, form } = useActionForm({
    schema: validateVerificationTokenSchema,
    action: validateVerificationToken,
    context: {
      email
    },
    onSuccess: () => {
      toast.success('Código validado com sucesso', {
        description: 'Você será redirecionado para a tela de login!'
      })

      router.push('/sign-in')
    },
    onError: error => {
      toast.error('Ocorreu um erro!', {
        description: error
      })
    },
    defaultValues: {
      code: token ?? ''
    }
  })

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de verificação</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Por favor digite o código de verificação enviado a você.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="button"
            className="bg-background text-muted-foreground hover:text-foreground transition-colors"
          >
            Reenviar email
          </button>
          <Button isLoading={isPending} type="submit" className="w-full">
            Verificar e-mail
          </Button>
        </form>
      </Form>
    </div>
  )
}
