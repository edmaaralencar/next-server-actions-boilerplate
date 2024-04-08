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
import { updatePassword } from '@/services/auth-service/update-password'
import { updatePasswordSchema } from '@/services/auth-service/update-password/schema'
import { toast } from 'sonner'

export default function Password() {
  const { onSubmit, isPending, form } = useActionForm({
    action: updatePassword,
    schema: updatePasswordSchema,
    onSuccess: () => {
      toast.success('Senha atualizada com sucesso')
    },
    onError: error => {
      toast.error('Ocorreu um erro.', {
        description: error
      })
    },
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
      oldPassword: ''
    }
  })

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-medium">Trocar senha</h2>

      <Form {...form}>
        <form
          className="space-y-5 flex flex-col items-end"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Senha antiga</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nova senha</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" type="password" />
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
