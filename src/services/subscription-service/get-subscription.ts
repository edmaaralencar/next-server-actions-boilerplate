import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function getSubscription() {
  try {
    const prices = await stripe.prices.list({
      expand: ['data.product']
    })

    const subscription = prices.data[0]

    return {
      ...subscription,
      product: subscription.product as Stripe.Product
    }
  } catch (error) {
    return null
  }
}
