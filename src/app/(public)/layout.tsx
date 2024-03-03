import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-screen h-screen">
      <div className="hidden lg:block relative bg-muted"></div>
      <div className="flex items-center justify-center relative">
        <div className="w-full max-w-sm lg:max-w-md px-4">{children}</div>
      </div>
    </div>
  )
}
