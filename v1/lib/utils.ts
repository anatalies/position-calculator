import { clsx, type ClassValue } from "clsx"
import { format, subMonths } from "date-fns"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLastFourMonths = () => {
  return Array.from({ length: 4 }, (_, index) =>
    format(subMonths(new Date(), index), "LLLL")
  )
}

export const schema = z.object({
  pair: z.string(),
  amount: z.coerce.number(),
  lotSize: z.coerce.number(),
  entryPrice: z.coerce.number(),
  exitPrice: z.coerce.number(),
  orderType: z.string(),
  tradeResult: z.string()
})