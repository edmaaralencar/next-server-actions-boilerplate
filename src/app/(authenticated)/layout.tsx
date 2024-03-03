import { Header } from '@/components/header'
import { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col w-full h-full">
      <Header />
      {children}
    </main>
  )
}
