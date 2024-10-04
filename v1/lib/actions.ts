'use server'

import { prisma } from '@/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  pair: z.string(),
  amount: z.coerce.number(),
  lotSize: z.coerce.number(),
  entryPrice: z.coerce.number(),
  exitPrice: z.coerce.number(),
  orderType: z.string(),
  tradeResult: z.string()
})

export async function recordTrade(formData:FormData) {
  const validatedFormData =  schema.safeParse({
    pair: formData.get('pair'),
    lotSize: formData.get('lotSize'),
    amount: formData.get('amount'),
    entryPrice: formData.get('entryPrice'),
    exitPrice: formData.get('exitPrice'),
    orderType: formData.get('orderType'),
    tradeResult: formData.get('tradeResult'),
  })

  if (!validatedFormData.success) {
    return {
      errors: validatedFormData.error.flatten().fieldErrors,
      message: 'Please enter valid details'
    }
  }

  const amountInCents = 
  validatedFormData.data.amount * 100

  try {
    console.log(amountInCents)
    await prisma.trade.create({
      data: {
        pair: validatedFormData.data.pair,
        tradeResult: validatedFormData.data.tradeResult,
        orderType: validatedFormData.data.orderType,
        lotSize: validatedFormData.data.lotSize,
        entryPrice: validatedFormData.data.entryPrice,
        exitPrice: validatedFormData.data.exitPrice, 
        amount: amountInCents,
      }
    })

  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice'
    }
  }

  revalidatePath('/dashboard/metrics')
}