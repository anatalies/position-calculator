'use server'

import { prisma } from '@/client'
import { TradeResult, TradeType } from '@prisma/client'
import { eachDayOfInterval, isSameDay } from 'date-fns'
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

  const {
    pair, 
    lotSize, 
    amount, 
    entryPrice,
    exitPrice, 
    orderType, 
    tradeResult
  } = validatedFormData.data

  // records trade
  const amountInCents = amount * 100
  await prisma.trade.create({
    data: {
      type: orderType as TradeType,
      result: tradeResult as TradeResult,
      currencyPair: pair,
      lotSize: lotSize,
      entryPrice: entryPrice,
      exitPrice: exitPrice, 
      amount: amountInCents,
      account: {
        connect: {id: 1}
      }
    }
  })

  // calculating change in account balances
  let balanceChange = 0
  let profit = 0
  let loss = 0
  let breakEven = 0

  if ( tradeResult === 'PROFIT') {
    balanceChange = amountInCents
    profit = amountInCents

    await prisma.account.update({
      where: { id: 1 },
      data: {
        balance: { increment: amountInCents },
        profit: { increment: amountInCents },
        loss: { increment: 0 },
        tradeCount: { increment: 1 } 
      }
    })
  } else if (tradeResult === 'LOSS') {
      balanceChange = - amountInCents
      loss = amountInCents

      await prisma.account.update({
        where: { id: 1 },
        data: {
          balance: { decrement: amountInCents },
          profit: { increment: 0 },
          loss: { increment: amountInCents },
          tradeCount: { increment: 1 } 
        }
      })
  } else if (tradeResult === 'BREAKEVEN') {
    balanceChange = amountInCents
    profit = amountInCents

    await prisma.account.update({
      where: { id: 1 },
      data: {
        balance: { increment: amountInCents },
        profit: { increment: amountInCents },
        loss: { increment: 0 },
        tradeCount: { increment: 1 } 
      }
    })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const existingSummary = await prisma.dailySummary.findFirst({
    where: {
      accountId: 1,
      date: today
    }
  })

  if (existingSummary) {
    await prisma.dailySummary.update({
      where: { id: existingSummary.id},
      data: {
        dailyBalance: { increment: balanceChange },
        dailyProfit: { increment: profit },
        dailyLoss: { increment: loss },
        tradeCount: { increment: 1 }
      }
    })
  } else {
    const account = await prisma.account.findUnique({
      where: { id: 1 },
      select: { balance: true }
    })

    await prisma.dailySummary.create({
      data: {
        accountId: 1,
        date: today,
        dailyBalance: account!.balance + balanceChange,
        dailyProfit: profit,
        dailyLoss: loss,
        tradeCount: 1
      }
    })
  }

  revalidatePath('/dashboard/metrics')
}

export async function fetchAccountDetails() {
  const account = await prisma.account.findUnique({
    where: {
      id: 1
    }
  })
  
  if (!account) {
    return null
  }

  const { balance, profit, loss, tradeCount } = account

  return {
    accountBalance: balance / 100,
    totalProfit: profit / 100,
    totalLoss: loss / 100,
    totalTrades: tradeCount,
    averageProfitLossRatio: loss !== 0 ? parseFloat((profit / loss ).toFixed(2)) : 0
  }
}

type DailyBalance = {
  date: string
  balance: number
}

export async function calculateDailyBalances (
  startDate: Date, endDate: Date ) {
    const account =  await prisma.account.findUnique({
      where: {id: 1},
      select: { balance: true }
    })

    if (!account) {
      throw new Error('Account not Found')
    }

    let currentBalance =  account.balance

    const trades = await prisma.trade.findMany({
      where: {
        accountId: 1,
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: { createdAt: 'asc'}
    })

    const datesInRange: Date[] = 
    eachDayOfInterval({ start: startDate, end: endDate})
    
    const dailyBalances : DailyBalance[] = []
    let tradeIndex = 0

    for ( const date of datesInRange) {
      //process all trades on this date
      while (
        tradeIndex < trades.length &&
        isSameDay(trades[tradeIndex].createdAt, date)
      ) {
        const trade = trades[tradeIndex]
        if (trade.result === 'PROFIT') {
          currentBalance += trade.amount
        } else if (trade.result == 'LOSS'){
          currentBalance -= trade.amount
        } else if (trade.result == 'BREAKEVEN') {
          currentBalance += trade.amount
        }
        tradeIndex++
      }
      dailyBalances.push({
        date: date.toISOString().split('T')[0],
        balance: currentBalance / 100,
      })
    }
    return dailyBalances
  }