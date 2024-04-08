import { Button } from '@/components/ui/button'
import { formatMoney } from '@/utils/format-money'
import Image from 'next/image'
import Stripe from 'stripe'

type ResumeProps = {
  subscription: Stripe.Price & { product: Stripe.Product }
  onNextStep: (value: number) => void
}

export function Resume({ subscription, onNextStep }: ResumeProps) {
  return (
    <div className="flex flex-col gap-8 items-end">
      <div className="flex items-start gap-6 w-full">
        <Image
          src={subscription?.product.images[0]}
          alt={subscription?.product.name}
          width={80}
          height={80}
        />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">
              {subscription.product.name}
            </h2>
            <span className="text-muted-foreground text-sm">
              {subscription.product.description}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm">Assina e tenha acesso a:</span>

            <ul className="list-disc ml-3">
              {subscription.product.features.map(item => (
                <li className="text-sm text-muted-foreground" key={item.name}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-1">
            <span>Preço:</span>
            <strong>
              {formatMoney(Number(subscription.unit_amount) / 100)}
            </strong>
          </div>
        </div>
      </div>

      <Button onClick={() => onNextStep(1)}>Avançar</Button>
    </div>
  )
}
