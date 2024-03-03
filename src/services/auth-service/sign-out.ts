'use server'

import { signOut as signOutNextAuth } from '@/lib/auth'

export async function signOut() {
  await signOutNextAuth()
}
