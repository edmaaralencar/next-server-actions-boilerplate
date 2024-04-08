'use client'

import { DollarSign, Key, LayoutDashboard, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const navLinks = [
  {
    label: 'Resumo',
    pathname: '/app/account',
    icon: LayoutDashboard
  },
  {
    label: 'Assinaturas',
    pathname: '/app/account/subscriptions',
    icon: DollarSign
  },
  {
    label: 'Dados pessoais',
    pathname: '/app/account/personal',
    icon: User
  },
  {
    label: 'Trocar senha',
    pathname: '/app/account/password',
    icon: Key
  }
]

export function AccountSidebar() {
  const pathname = usePathname()

  return (
    <div className="border border-muted w-full max-w-sm rounded-md flex flex-col gap-1 py-4">
      {navLinks.map(link => (
        <Link
          key={link.label}
          href={link.pathname}
          className={cn(
            'flex gap-2 w-full py-4 px-6 hover:bg-muted transition-colors items-center border-l-2 text-sm border-muted',
            pathname === link.pathname && 'bg-muted font-bold border-primary'
          )}
        >
          <link.icon className="w-4 h-4" />
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  )
}
