'use server'

import { z } from "zod"

const FormSchema = z.object({
    lotSize: z.coerce
      .number({
        required_error: "Please insert value.",
      }),
    profitLoss: z.coerce
      .number({
        required_error: "Please insert value.",
      }),
    pair: z
      .string({
        required_error: "Please select currency.",
      }),
    entryPrice: z.coerce
      .number({
        required_error: "Please insert value.",
      }),
    exitPrice: z.coerce
      .number({
        required_error: "Please insert value.",
      })  
})


const RecordTrade = FormSchema

export async function recordTrade(prevState:any, formData: FormData) {
    const { pair, lotSize, profitLoss, entryPrice, exitPrice}  = RecordTrade.parse ({
        pair: formData.get('pair'),
        lotSize: formData.get('lotSize'),
        profitLoss: formData.get('profit'),
        entryPrice: formData.get('entryPrice'),
        exitPrice: formData.get('exitPrice')
    })

    console.log(pair)
}