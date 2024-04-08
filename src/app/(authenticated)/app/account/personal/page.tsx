'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useActionForm } from '@/hooks/use-action-form'
import { useCurrentUser } from '@/hooks/use-current-user'
import { updateProfile } from '@/services/auth-service/update-profile'
import { updateProfileSchema } from '@/services/auth-service/update-profile/schema'
import { toast } from 'sonner'

export default function Access() {
  const user = useCurrentUser()

  const { onSubmit, isPending, form } = useActionForm({
    action: updateProfile,
    schema: updateProfileSchema,
    onSuccess: () => {
      toast.success('Conta atualizada com sucesso')
    },
    onError: error => {
      toast.error('Ocorreu um erro!', {
        description: error
      })
    },
    defaultValues: {
      email: String(user?.email),
      name: String(user?.name)
    }
  })

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-medium">Dados pessoais</h2>

      <Form {...form}>
        <form
          className="space-y-5 flex flex-col items-end"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
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
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nome X" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button isLoading={isPending} type="submit" className="">
            Salvar
          </Button>
        </form>
      </Form>
    </div>
  )
}
