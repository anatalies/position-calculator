import create from 'zustand'
import  { TradeState } from './types/types'

const useAppStore = create<TradeState>((set) => ({
    trades: [],
    addTrade: (newTrade) =>
        set((state) => ({
            trades: [...state.trades, newTrade]
        })),
    updateTrade: (updatedTrade) =>
        set((state) => ({
            trades: state.trades.map((trade) =>
            trade.id === updatedTrade.id ? updatedTrade : trade
            ),
        })),
    resetTrades: () => set(() => ({ trades: [] })),
}))

export default