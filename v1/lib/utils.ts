import { clsx, type ClassValue } from "clsx"
import { format, subMonths } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLastFourMonths = () => {
  return Array.from({ length: 4 }, (_, index) =>
    format(subMonths(new Date(), index), "LLLL")
  )
}

export const generateChartDataForMonth = (month: string) => {
  // Simulating data for the selected month
  return [
    { day: "01", balance: Math.floor(Math.random() * 300) },
    { day: "05", balance: Math.floor(Math.random() * 300) },
    { day: "10", balance: Math.floor(Math.random() * 300) },
    { day: "15", balance: Math.floor(Math.random() * 300) },
    { day: "20", balance: Math.floor(Math.random() * 300) },
    { day: "25", balance: Math.floor(Math.random() * 300) },
  ]
}