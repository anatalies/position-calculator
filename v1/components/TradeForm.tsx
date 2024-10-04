'use client'
import { toast } from "@/hooks/use-toast"
import { z } from "zod"
import { Input } from "./ui/input"
import { recordTrade } from "@/lib/actions"
import { Label } from "./ui/label"
import SubmitButton from "./SubmitButton"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"


export default function TradeForm() {  
  return (
    <form action={recordTrade} className="flex flex-col space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Currency Pair</Label>
          <Select name="pair">
            <SelectTrigger >
              <SelectValue placeholder="Select trade type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="AUD/CAD">AUD/CAD</SelectItem>
                <SelectItem value="GBP/USD">GBP/USD</SelectItem>
                <SelectItem value="EUR/USD">EUR/USD</SelectItem>
                <SelectItem value="USD/CHF">USD/CHF</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Order Type</Label>
          <Select name="orderType">
            <SelectTrigger >
              <SelectValue placeholder="Select trade type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Trade Result</Label>
          <Select name="tradeResult">
            <SelectTrigger >
              <SelectValue placeholder="Result" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="profit">Profit</SelectItem>
                <SelectItem value="loss">Loss</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Lot Size</Label>
          <Input name='lotSize' type="number" step={'0.01'} required/>
        </div>
        <div className="space-y-1">
          <Label>Amount(USD)</Label>
          <Input name='amount' type="number" step={'0.01'} required />
        </div>
        <div className="space-y-1">
          <Label>Entry Price</Label>
          <Input name='entryPrice' type="number" required step={'0.0001'}/>
        </div>
        <div className="space-y-1">
          <Label>Exit Price</Label>
          <Input name='exitPrice' type="number" required step={'0.0001'}/>
        </div>
      </div>
      <SubmitButton/>
    </form>
  )
}