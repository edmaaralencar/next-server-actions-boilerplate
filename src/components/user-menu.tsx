'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { LogOut, Settings, User } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

type UserMenuProps = {
  name: string | undefined | null
  email: string | undefined | null
}

export function UserMenu({ email, name }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            asChild
            className="flex flex-row gap-2 items-center p-2"
          >
            <Link href="/account/me">
              <User className="w-6 h-6" />

              <div className="flex flex-col">
                <span className="text-sm">Perfil</span>
                <span className="text-muted-foreground text-xs">
                  Visualize seu perfil e compartilhe com outros
                </span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="flex flex-row gap-2 items-center p-2"
          >
            <Link href="/app/account">
              <Settings className="w-6 h-6" />

              <div className="flex flex-col">
                <span className="text-sm">Configurações</span>
                <span className="text-muted-foreground text-xs">
                  Acesse os seus dados
                </span>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex flex-row gap-2 items-center p-2"
          onClick={() => signOut()}
        >
          <LogOut className="w-6 h-6" />

          <div className="flex flex-col">
            <span className="text-sm">Sair</span>
            <span className="text-muted-foreground text-xs">
              Saia da sua conta
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
