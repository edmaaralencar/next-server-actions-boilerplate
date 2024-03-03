'use client'

import { toast } from 'sonner'
import { signIn as signInNextAuth } from 'next-auth/react'

import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'

import { useActionForm } from '@/hooks/use-action-form'

import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes.config'

import { signInSchema } from '@/services/auth-service/sign-in/schema'
import { signIn } from '@/services/auth-service/sign-in'

export function SignInForm() {
  const { onSubmit, isPending, form } = useActionForm({
    schema: signInSchema,
    action: signIn,
    onSuccess: () => {
      toast.success('Login realizado com sucesso', {
        description: 'Você será redirecionado para a aplicação!'
      })
    },
    onError: error => {
      toast.error('Ocorreu um erro!', {
        description: error
      })
    },
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function signInWithProvider(provider: 'google' | 'github') {
    signInNextAuth(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="john.doe@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button isLoading={isPending} type="submit" className="w-full">
            Entre
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou entre com
          </span>
        </div>
      </div>

      <Button onClick={() => signInWithProvider('google')} variant="outline">
        <Icons.google className="w-4 h-4" />
      </Button>
    </div>
  )
}
