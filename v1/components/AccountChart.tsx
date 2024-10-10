"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {Card,CardContent,
  CardDescription,CardFooter,
  CardHeader, CardTitle,
} from "@/components/ui/card"
import {ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { chartConfig, getLastFourMonths } from "@/lib/utils"
import { getDailySummaries } from "@/lib/actions"
import { ChartDataPoint } from "@/types/types"


export function AccountChart() {
  const [activeMonth, setActiveMonth] = useState(format(new Date(), "MMMM"))
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])

  useEffect(() => {
    const getData = async () => {
      const data = await getDailySummaries(activeMonth)
      setChartData(data)
    }
    getData()
  }, [activeMonth])

  const months = getLastFourMonths()

  return (
    <Card className="w-full">
      <CardHeader className="flex-row items-start space-y-0 space-x-3 pb-0">
        <div className="grid gap-1 my-1">
          <CardTitle>Balance History</CardTitle>
          <CardDescription>{activeMonth}</CardDescription>
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
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="balance"
              type="natural"
              stroke="#ff0000"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing account balances for {activeMonth}
        </div>
      </CardFooter>
    </Card>
  )
}
