'use client'
import { toast } from "@/hooks/use-toast"
import { z } from "zod"
import { Input } from "./ui/input"
import { recordTrade } from "@/lib/actions"
import { Label } from "./ui/label"
import SubmitButton from "./SubmitButton"


export default function TradeForm() {  
  return (
    <form action={recordTrade} className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid items-center">
          <Label>Currency Pair</Label>
          <select name="pair">
            <option value={'AUDCAD'}>AUDCAD</option>
            <option value={'GBP/USD'}>GBP/USD</option>
            <option value={'EUR/USD'}>EUR/USD</option>
            <option value={'USD/CHF'}>USD/CHF</option>
          </select>
        </div>
        <div className="grid items-center">
          <Label>Order Type</Label>
          <select name="orderType">
            <option value={'buy'}>Buy</option>
            <option value={'sell'}>Sell</option>
          </select>
        </div>
        <div className="grid items-center">
          <Label>Trade Result</Label>
          <select name="tradeResult">
            <option value={'profit'}>Profit</option>
            <option value={'loss'}>Loss</option>
          </select>
        </div>
        <div>
          <Label>Lot Size</Label>
          <Input name='lotSize' type="number" step={'0.01'} required/>
        </div>
        <div>
          <Label>Amount(USD)</Label>
          <Input name='amount' type="number" step={'0.01'} required />
        </div>
        <div>
          <Label>Entry Price</Label>
          <Input name='entryPrice' type="number" required step={'0.0001'}/>
        </div>
        <div>
          <Label>Exit Price</Label>
          <Input name='exitPrice' type="number" required step={'0.0001'}/>
        </div>
      </div>
      <SubmitButton/>
    </form>
  )
}