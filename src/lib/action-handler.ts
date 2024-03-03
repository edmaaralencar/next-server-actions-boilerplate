/* eslint-disable @typescript-eslint/no-explicit-any */
import { currentUser } from '@/services/auth-service/current-user'
import { User } from 'next-auth'
import { z } from 'zod'

export type FieldErrors<T> = {
  [K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>
  error?: string | null
  data?: TOutput
}

type HandlerProps<TInput> = {
  input: TInput
  user: User & {
    role: 'USER' | 'ADMIN'
    isOAuth: boolean
  }
  context?: Record<string, any>
}

type ActionProps<TInput, TOutput> =
  | {
      schema: z.Schema<TInput>
      handler: ({
        input,
        context,
        user
      }: HandlerProps<TInput>) => Promise<ActionState<TInput, TOutput>>

      type: 'private'
    }
  | {
      type: 'public'
      schema: z.Schema<TInput>
      handler: ({
        input,
        context
      }: Omit<HandlerProps<TInput>, 'user'>) => Promise<
        ActionState<TInput, TOutput>
      >
    }

export const action = <TInput, TOutput>({
  schema,
  handler,
  type
}: ActionProps<TInput, TOutput>) => {
  return async (
    data: TInput,
    context?: Record<string, any>
  ): Promise<ActionState<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data)

    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>
      }
    }

    if (type === 'private') {
      const user = await currentUser()

      if (!user) {
        return {
          error: 'Unauthorized'
        }
      }

      return handler({
        input: validationResult.data,
        context,
        user
      })
    }

    return handler({ input: validationResult.data })
  }
}
