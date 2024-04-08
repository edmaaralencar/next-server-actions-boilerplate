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
import { useCurrentUser } from '@/hooks/use-current-user'
import { generatePaymentIntent } from '@/services/subscription-service/generate-payment-intent'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, startTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type DataProps = {
  onNextStep: (value: number) => void
  subscriptionId: string
  setUser: Dispatch<
    SetStateAction<{
      name: string
      cpf: string
      phone: string
      neighbourhood: string
      cep: string
      number: string
      complement: string
      street: string
      clientSecret: string
      state: string
    } | null>
  >
}

const paymentDataFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Nome é obrigatório'
  }),
  cpf: z.string().min(1, {
    message: 'CPF é obrigatório'
  }),
  phone: z.string().min(1, {
    message: 'Telefone é obrigatório'
  }),
  cep: z.string().min(1, {
    message: 'CEP é obrigatório'
  }),
  street: z.string().min(1, {
    message: 'Rua é obrigatório'
  }),
  number: z.string().min(1, {
    message: 'Número é obrigatório'
  }),
  complement: z.string(),
  neighbourhood: z.string().min(1, {
    message: 'Bairro é obrigatório'
  }),
  city: z.string().min(1, {
    message: 'Cidade é obrigatório'
  }),
  state: z.string().min(1, {
    message: 'Estado é obrigatório'
  })
})

type FormInput = z.infer<typeof paymentDataFormSchema>

export function Data({ onNextStep, subscriptionId, setUser }: DataProps) {
  const user = useCurrentUser()

  const form = useForm<FormInput>({
    resolver: zodResolver(paymentDataFormSchema),
    defaultValues: {
      name: user?.name ?? '',
      cep: '',
      city: '',
      complement: '',
      cpf: '',
      neighbourhood: '',
      number: '',
      phone: '',
      state: '',
      street: ''
    }
  })

  async function onSubmit(values: FormInput) {
    console.log(values)
    try {
      startTransition(() => {
        generatePaymentIntent({ subscriptionId }).then(response => {
          console.log(response)
          if (response.data) {
            setUser({
              ...values,
              clientSecret: response.data
            })

            onNextStep(2)
          }
        })
      })
    } catch (error) {
      console.log(error)
      toast.error('Erro')
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Nome" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="111.111.111-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="(81) 99999-9999" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-[1fr_2fr] gap-4">
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="55555-554" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Rua X" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-[1fr_2fr] gap-4">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="123" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Do lado de X" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="neighbourhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Bairro X" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-[3fr_1fr] gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Cidade" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Estado" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <Button variant="outline" onClick={() => onNextStep(0)}>
            Voltar
          </Button>
          <Button type="submit">Avançar</Button>
        </div>
      </form>
    </Form>
  )
}
