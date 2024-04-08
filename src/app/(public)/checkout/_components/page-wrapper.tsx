'use client'

import { formatMoney } from '@/utils/format-money'
import { useState } from 'react'
import Stripe from 'stripe'
import { Step } from './step'
import { Resume } from './resume'
import { Data } from './data'

type PageWrapperProps = {
  subscription: Stripe.Price & { product: Stripe.Product }
}

export function PageWrapper({ subscription }: PageWrapperProps) {
  const [step, setStep] = useState(0)
  const [user, setUser] = useState<{
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
  } | null>(null)

  const steps: Record<number, string> = {
    0: 'Resumo',
    1: 'Dados',
    2: 'Pagamento'
  }

  console.log({ user })

  return (
    <main className="mx-auto max-w-5xl w-full my-24 flex gap-8 relative items-start">
      <div className="border border-border rounded-md w-full flex flex-col">
        <header className="border-b border-border p-8 flex flex-col gap-4">
          <div className="w-full flex items-center">
            <Step currentStep={step} step={0} />
            <div className="w-full h-[2px] bg-muted"></div>
            <Step currentStep={step} step={1} />
            <div className="w-full h-[2px] bg-muted"></div>
            <Step currentStep={step} step={2} />
          </div>
          <div className="mx-auto font-semibold">Passo: {steps[step]}</div>
        </header>

        <div className="p-8">
          {step === 0 && (
            <Resume onNextStep={setStep} subscription={subscription} />
          )}
          {step === 1 && (
            <Data
              subscriptionId={subscription.id}
              onNextStep={setStep}
              setUser={setUser}
            />
          )}
        </div>
      </div>
      <div className="sticky top-4 border border-border rounded-md w-[400px]">
        <header className="border-b border-border p-4">Resumo</header>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center justify-between">
            <span className="text-lg">{subscription?.product.name}</span>
            <strong>
              {formatMoney(Number(subscription?.unit_amount) / 100)}
            </strong>
          </div>
        </div>
      </div>
    </main>
  )
}
