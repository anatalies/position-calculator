'use server'

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

  console.log(validatedFormData.data?.amount)
  revalidatePath('/dashboard/metrics')
}