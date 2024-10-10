"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { ChartDataPoint } from "@/types/types"
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { getDailyProfitLoss } from "@/lib/actions"
import { getLastFourMonths } from "@/lib/utils"


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-2))",
  },
  mobile: {
    label: "Mobile",
    color: "#ff0000",
  },
} satisfies ChartConfig

export function BarChartPL() {
    const [chartData, setChartData] = useState<ChartDataPoint[]>([])
    const [activeMonth, setActiveMonth] = useState(format(new Date(), "MMMM"))

    useEffect(() => {
        const getData = async () => {
          const data = await getDailyProfitLoss(activeMonth)
          setChartData(data)
        }
        getData()
    }, [activeMonth])

    const months = getLastFourMonths()
    
    return (
        <Card className="w-full">
        <CardHeader className="flex-row items-start space-y-0 space-x-3 pb-0">
            <div className="grid gap-1 my-1">
            <CardTitle>Daily Profit & Loss</CardTitle>
            </div>
            <Select value={activeMonth} onValueChange={setActiveMonth}>
            <SelectTrigger
                className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                aria-label="Select a value"
            >
                <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
                {months.map((month) => {
                return (
                    <SelectItem
                    key={month}
                    value={month}
                    className="rounded-lg [&_span]:flex"
                    >
                    <div className="flex items-center gap-2 text-xs">
                        <span
                        className="flex h-3 w-3 shrink-0 rounded-sm"
                        style={{
                            backgroundColor: `var(--color-${month})`,
                        }}
                        />
                        {month}
                    </div>
                    </SelectItem>
                )
                })}
            </SelectContent>
            </Select>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="dailyProfit" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="dailyLoss" fill="var(--color-mobile)" radius={4} />
            </BarChart>
            </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
            Showing total profit and loss for {activeMonth}
            </div>
        </CardFooter>
        </Card>
    )
}
