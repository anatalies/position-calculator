'use server'

import { prisma } from '@/client'
import { TradeResult, TradeType } from '@prisma/client'
import { endOfMonth, format } from 'date-fns'
import { revalidatePath } from 'next/cache'
import { monthToNumberMap, schema } from './utils'


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

  const { pair, lotSize, amount, 
    entryPrice, exitPrice, 
    orderType, tradeResult
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

  // helper functions
  // 1. 
  const updateDailySummary = async (
    incrementBalance: number,
    incrementProfit: number,
    incrementLoss: number
  ) => {
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
        where: { id: existingSummary.id },
        data: {
          dailyBalance: { increment: incrementBalance },
          dailyProfit: { increment: incrementProfit },
          dailyLoss: { increment: incrementLoss },
          tradeCount: { increment: 1 },
        },
      });
    } else {
      const account = await prisma.account.findUnique({
        where: { id: 1 },
        select: { balance: true },
      })

      await prisma.dailySummary.create({
        data: {
          accountId: 1,
          date: today,
          dailyBalance: account!.balance + incrementBalance,
          dailyProfit: incrementProfit,
          dailyLoss: incrementLoss,
          tradeCount: 1,
        },
      });
    }
  }
  // 2.
  const updateAccount = async (incrementBalance: number,
    incrementProfit: number,
    incrementLoss: number,
  ) => {
    await prisma.account.update({
      where: { id: 1 },
      data: {
        balance: { increment: incrementBalance },
        profit: { increment: incrementProfit },
        loss: { increment: incrementLoss },
        tradeCount: { increment: 1 },
      },
    })
  }
  //db pushes to dailysummary and account tables
  if (tradeResult === 'PROFIT') {
      try {
        await updateDailySummary(amountInCents, amountInCents, 0)
        await updateAccount(amountInCents, amountInCents, 0)
      } catch (error) {
        return {
          message: 'Error updating account'
        }
      }
  } else if (tradeResult === 'LOSS') {
      try {
        await updateDailySummary(-amountInCents, 0, amountInCents)
        await updateAccount(-amountInCents, 0, amountInCents)
      } catch (error) {
        return {
          message: 'Error updating account'
        }
      }
  } else if (tradeResult === 'BREAKEVEN') {
      try {
        await updateDailySummary(amountInCents, amountInCents, 0)
        await updateAccount(amountInCents, amountInCents, 0)
      } catch (error) {
        return {
          message: 'Error updating account'
        }
      }
  }
  revalidatePath('/dashboard/metrics')
}


export async function getAccountDetails() {
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

export async function getDailySummaries(month:string) {
  const year = new Date().getFullYear()
  const firstDayOfMonth = new Date(`${year}-${month}-01 00:00:00`)
  const lastDayOfMonth = endOfMonth(firstDayOfMonth)
  const dailySummaries = await prisma.dailySummary.findMany({
    where: {
      date: {
        gte: firstDayOfMonth, lte: lastDayOfMonth
      }
    },
    select: {
      date: true, dailyBalance: true, dailyLoss: true, dailyProfit: true
    },
    orderBy: {
      date: 'asc'
    }
  })
  const chartData = dailySummaries.map(summary => ({
    day: format(summary.date, 'dd'),
    balance: summary.dailyBalance / 100,
  }))
  return chartData
}

export async function getDailySummaries2(month:string) {
  const year = new Date().getFullYear()
  const monthNumber = monthToNumberMap[month] || '01'
  const firstDayOfMonth = new Date(`${year}-${monthNumber}-01 00:00:00`)
  const lastDayOfMonth = endOfMonth(firstDayOfMonth)
  
  const dailySummaries = await prisma.dailySummary.findMany({
    where: {
      date: {
        gte: firstDayOfMonth, lte: lastDayOfMonth
      }
    },
    select: {
      date: true, dailyBalance: true, dailyLoss: true, dailyProfit: true
    },
    orderBy: {
      date: 'asc'
    }
  })
  const chartData = dailySummaries.map(summary => ({
    day: format(summary.date, 'dd'),
    dailyProfit: summary.dailyProfit / 100,
    dailyLoss: summary.dailyLoss / 100
  }))
  return chartData
}

export async function getDailyProfitLoss( month:string ) {
  const year = new Date().getFullYear()
  const firstDayOfMonth = new Date(`${year}-${month}-01 00:00:00`)
  const lastDayOfMonth = endOfMonth(firstDayOfMonth)
  const dailySummaries = await prisma.dailySummary.findMany({
    where: {
      date: {
        gte: firstDayOfMonth, lte: lastDayOfMonth
      }
    },
    select: {
      date: true, dailyProfit: true, dailyLoss: true,
    },
    orderBy: {
      date: 'asc'
    }
  })

  const chartData = dailySummaries.map(summary => ({
    day: format(summary.date, 'dd'),
    dailyProfit: summary.dailyProfit / 100,
    dailyLoss: summary.dailyLoss / 100
  }))

  return chartData
}

export async function getAllTrades() {
  const data = await prisma.trade.findMany({
    where: {
      id: { gt: 0 }
    },
    select: {
      id: true,
      type: true,
      createdAt: true,
      result: true,
      amount: true,
      currencyPair: true,
      lotSize: true
    },
    orderBy: { 
      id: 'desc'
    }
  })

  return data
}
