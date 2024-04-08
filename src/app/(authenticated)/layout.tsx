import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'
import { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col">
      <Header />
      <div className="grid h-full w-full md:grid-cols-[190px_1fr] lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <section className="h-full w-full overflow-y-scroll p-8">
          {children}
        </section>
      </div>
    </main>
  )
}
