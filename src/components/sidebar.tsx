'use client'

import { cn } from '@/lib/utils'
import { Home, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  {
    label: 'Início',
    pathname: '/app',
    Icon: Home
  }
  // {
  //   label: 'Pacientes',
  //   pathname: '/patients',
  //   Icon: LuUsers
  // }
]

export function Sidebar() {
  const pathname = usePathname()

  // const isOpen = useSidebar(state => state.isOpen)
  // const toggleSidebar = useSidebar(state => state.toggleSidebar)

  const isOpen = false

  return (
    <div
      className={cn(
        'border-r border-muted hidden h-[calc(100vh-96px)] md:block md:w-[190px] lg:w-[260px]',
        isOpen ? 'block w-72' : 'hidden'
      )}
    >
      <button className="block px-8 pt-6 md:hidden">
        <X className="w-6 h-6 text-white" />
      </button>
      <div className="flex flex-col gap-1 px-4 py-8">
        {items.map(item => (
          <Link
            key={item.label}
            href={item.pathname}
            className={cn(
              'flex flex-row items-center gap-3 rounded-md p-3 transition-colors hover:bg-muted',
              pathname === item.pathname ? 'bg-muted' : 'bg-transparent'
            )}
          >
            <item.Icon
              size={24}
              color={pathname === item.pathname ? 'white' : 'white'}
            />
            <span
              className={cn(
                'font-semibold',
                pathname === item.pathname ? 'text-white' : 'text-primary-100'
              )}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
