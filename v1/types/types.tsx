export interface CalculatorInput {
    accountBalance: number
    riskPercentage: number
    entryPrice?: number
    pipValue?: number
    stopLossPrice: number
    stopLossSize: number
    takeProfitSize?: number
    selectedPair: CurrencyPair
    riskReward: number

}

export interface CalculatorOutput {
    riskAmount: number
    lotSize?: number
    totalRisk: number
    stopLossDistance?: number
    positionSize?: number
    profit?: number
}

export interface CurrencyPair {
    name: string
    pipValue: number
}