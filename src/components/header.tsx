import { currentUser } from '@/services/auth-service/current-user'
import { UserMenu } from './user-menu'

export async function Header() {
  const user = await currentUser()

  return (
    <header className="border-b h-16 px-4 flex justify-between items-center">
      <h1>Logo</h1>

      <UserMenu name={user?.name} email={user?.email} />
    </header>
  )
}
