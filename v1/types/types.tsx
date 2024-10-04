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
    takeProfitPips: number
}

export interface CalculatorOutput {
    riskAmount: number
    lotSize?: number
    totalRisk: number
    stopLossDistance?: number
    positionSize: number
    profit: number
}

export interface CurrencyPair {
    name: string
    pipValue: number
}

export interface Trade extends Account {
    id: number
    pair: string
    lotSize: number
    entryPrice: number
    exitPrice: number
    profitLoss: number
    riskReward?: number
    createdAt: Date
    account: Account
    accountId: Account

}

export interface Account {
    id       :  number    
    balance   : number   
    totalProfit:number   
    totalLoss :number    
    drawdown : Date
    updatedAt : Date
    trades    : Trade[]
}

export interface TradeState {
    trades: Trade[];
    addTrade: (newTrade: Trade) => void;
    updateTrade: (updatedTrade: Trade) => void;
    resetTrades: () => void;
}

export interface ActionButtonProps {
    onClick: () => void;
}