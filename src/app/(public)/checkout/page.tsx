import { getSubscription } from '@/services/subscription-service/get-subscription'
import { PageWrapper } from './_components/page-wrapper'
import { notFound } from 'next/navigation'

export default async function Checkout() {
  const subscription = await getSubscription()

  if (!subscription) {
    return notFound()
  }

  return <PageWrapper subscription={subscription} />
}
