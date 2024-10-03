'use client'
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { recordTrade } from "@/lib/actions"
import { Label } from "./ui/label"
import SubmitButton from "./SubmitButton"


 const FormSchema = z.object({
    lotSize: z.coerce
      .number({
        required_error: "Please insert value.",
      }),
    profitLoss: z.coerce
      .number({
        required_error: "Please insert value.",
      }),
    pair: z
      .string({
        required_error: "Please select currency.",
      }),
    entryPrice: z.coerce
      .number({
        required_error: "Please insert value.",
      }),
    exitPrice: z.coerce
      .number({
        required_error: "Please insert value.",
      })  
})

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
        <div>
          <Label>Lot Size</Label>
          <Input name='lotSize' type="number" step={'0.02'} required/>
        </div>
        <div>
          <Label>Profit</Label>
          <Input name='profit' type="number" required step={'0.10'}/>
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