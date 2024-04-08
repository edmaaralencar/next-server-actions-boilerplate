import { currentUser } from '@/services/auth-service/current-user'
import { UserMenu } from './user-menu'

export async function Header() {
  const user = await currentUser()

  return (
    <header className="border-b border-muted h-24 px-8 flex justify-between items-center">
      <h1 className="text-3xl">Logo</h1>

      <UserMenu name={user?.name} email={user?.email} />
    </header>
  )
}
