import { DollarSign } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Subscriptions() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-medium">Assinaturas</h2>

      <div className="p-8 border border-border rounded-md flex gap-8 items-center">
        <div className="p-6 rounded-full bg-muted">
          <DollarSign className="w-24 h-24" />
        </div>

        <div className="flex flex-col">
          <strong className="text-lg mb-1">
            Você não possui uma assinatura ativa.
          </strong>
          <span className="text-sm text-muted-foreground">
            Assine agora para ter acesso imediato a plataforma.
          </span>
          <Button className="mt-6" asChild>
            <Link href="/checkout">Assinar</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
