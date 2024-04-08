import { AccountSidebar } from '@/components/account-sidebar'
import { ReactNode } from 'react'

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Minha conta</h1>
        <span className="text-muted-foreground">
          Gerencie as informações da sua conta
        </span>
      </header>

      <div className="flex gap-8 items-start">
        <AccountSidebar />
        <div className="border border-muted w-full p-5 rounded-md">
          {children}
        </div>
      </div>
    </div>
  )
}
