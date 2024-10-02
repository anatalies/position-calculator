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
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    })
  
    function onSubmit(data: z.infer<typeof FormSchema>) {
        recordTrade(data)
        toast({
            title: "You submitted the following values:",
            description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
            ),
        })
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-5/6 mx-auto">
        <div className="grid grid-cols-2 gap-3 mb-1">
          <FormField
            control={form.control}
            name="pair"
            render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency Pair</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="EUR/USD">EUR/USD</SelectItem>
                      <SelectItem value="GBP/USD">GBP/USD</SelectItem>
                      <SelectItem value="USD/CHF">USD/CHF</SelectItem>
                      <SelectItem value="AUD/CAD">USD/CHF</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lotSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lot Size</FormLabel>
                <FormControl>
                  <Input placeholder="0.10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profitLoss"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profit/Loss</FormLabel>
                <FormControl>
                  <Input placeholder="1.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entryPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entry Price</FormLabel>
                <FormControl>
                  <Input placeholder="1.3421" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="exitPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exit Price</FormLabel>
                <FormControl>
                  <Input placeholder="1.3421" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <Button type="submit" className="my-2">Submit</Button>
        </form>
      </Form>
    )
}