/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useForm } from 'react-hook-form'
import { z, ZodObject } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

type ActionInput<T extends ZodObject<any, any, any, any>> = {
  schema: T
  action: (input: z.infer<T>, context?: Record<string, any>) => Promise<any>
  onSuccess: () => void
  onError: (error: string) => void
  defaultValues: z.infer<T>
  context?: Record<string, any>
}

export const useActionForm = <T extends ZodObject<any, any, any, any>>({
  schema,
  action,
  onSuccess,
  onError,
  defaultValues,
  context
}: ActionInput<T>) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues
  })

  const onSubmit = async (formData: z.infer<T>) => {
    startTransition(() => {
      action(formData, context).then(response => {
        if (response?.error) {
          if (response.error === 'Unauthorized') {
            router.push('/login')
            return
          }

          onError(response.error)
          return
        }

        if (response?.data) {
          onSuccess()
        }
      })
    })
  }

  return {
    form,
    onSubmit,
    isPending
  }
}
