import { ChartConfig } from "@/components/ui/chart"
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

export const monthToNumberMap : Record<string, string> = {
  January :  '01',
  February:  '02',
  March:     '03',
  April:     '04',
  May:       '05',
  June:      '06',
  July:      '07',
  August:    '08',
  September: '09',
  October:   '10',
  November:  '11',
  December:  '12'
}

export const chartConfig = {
  january: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
  june: {
    label: "June",
    color: "hsl(var(--chart-6))",
  },
  july: {
    label: "July",
    color: "hsl(var(--chart-7))",
  },
  august: {
    label: "August",
    color: "hsl(var(--chart-8))",
  },
  september: {
    label: "September",
    color: "hsl(var(--chart-9))",
  },
  october: {
    label: "October",
    color: "hsl(var(--chart-10))",
  },
  november: {
    label: "November",
    color: "hsl(var(--chart-11))",
  },
  december: {
    label: "December",
    color: "hsl(var(--chart-12))",
  },
} satisfies ChartConfig;