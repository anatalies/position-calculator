'use client'

import { 
  CalculatorInput, 
  CalculatorOutput, 
  CurrencyPair 
} from '@/types/types'

import React, { useState } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'

const currencyPairs: CurrencyPair[] = [
  { name: 'EUR/USD', pipValue:  10.0000},
  { name: 'GBP/USD', pipValue: 10.0000 },
  { name: 'USD/CHF', pipValue: 11.86817 },
  { name: 'AUD/CAD', pipValue:  7.39919 },
]


const calculatePositionSize = ({
  accountBalance,
  riskPercentage,
  stopLossSize,
  selectedPair,
  riskReward,
  entryPrice,
  takeProfitPips,

}: CalculatorInput): CalculatorOutput => {
  const riskAmount = (accountBalance * riskPercentage) / 100
  const pipValuePerLot = selectedPair.pipValue
  const valuePerPip = riskAmount / stopLossSize
  const lotSize = riskAmount * valuePerPip 
  const positionSize = riskAmount / (stopLossSize * pipValuePerLot)
  const totalRisk = stopLossSize * pipValuePerLot * positionSize
  const profit = takeProfitPips * pipValuePerLot * positionSize
  return {
    positionSize,
    totalRisk,
    profit,
    riskAmount,
    lotSize
  }
}


const Calculator = () => {
    const [inputs, setInputs] = useState<CalculatorInput>({
        accountBalance: 50.00,  
        riskPercentage: 1,
        stopLossSize: 2.0,
        selectedPair: currencyPairs[0],
        stopLossPrice: 1.2325,
        riskReward: 4,
        entryPrice: 1.4672,
        takeProfitPips: 8.0
    })

    const [result, setResult] = useState<CalculatorOutput | null>(null) 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({
          ...inputs,
          [e.target.name]: parseFloat(e.target.value),
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const calculationResult = calculatePositionSize(inputs);
        setResult(calculationResult);
    }

    const handlePairChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedPair = currencyPairs.find(pair => pair.name === e.target.value)!;
      setInputs({ ...inputs, selectedPair });
    }

  return (
    <div className='w-[330px]'>
      <Card className='p-2 border-2 border-purple-400'>
        <CardHeader>
          <CardTitle className='text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600 '>Position Calculator</CardTitle> 
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
          <div>
              <Label className='my-1'>Currency Pair: </Label>
              <select name="currencyPair" onChange={handlePairChange} value={inputs.selectedPair.name}>
                {currencyPairs.map((pair) => (
                  <option key={pair.name} value={pair.name}>
                    {pair.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Account Balance ($): </Label>
              <Input
                type="number"
                name="accountBalance"
                value={inputs.accountBalance}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Risk (%):</Label>
              <Input
                type="number"
                name="riskPercentage"
                value={inputs.riskPercentage}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Stop Loss (pips): </Label>
              <Input
                type="number"
                name="stopLossSize"
                value={inputs.stopLossSize}
                step="0.01"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Take Profit (pips):</Label>
              <Input
                type="number"
                name="takeProfitPips"
                value={inputs.takeProfitPips}
                onChange={handleChange}
                required
              />
            </div> 
            <div>
              <Label>Risk/Reward: </Label>
              <Input
                type="number"
                name="riskReward"
                value={inputs.riskReward}
                step="0.1"
                onChange={handleChange}
                placeholder='Optional'
              />
            </div>
            <Button type="submit" className='my-2 bg-purple-600'>Calculate</Button>
          </form>

          {result && (
            <div style={{ marginTop: '10px' }}>
              <p>Position Size: {result.positionSize.toFixed(2)}</p>
              <p>Risk Amount: ${result.riskAmount.toFixed(2)}</p>
              <p>Total Risk: ${result.totalRisk.toFixed(2)}</p>
              <p>Profit: ${result.profit.toFixed(2)}</p>
              <p>Lot: ${result.lotSize?.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
   </div>
  )
}

export default Calculator
