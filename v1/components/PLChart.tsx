"use client"

import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {Card,CardContent,CardDescription,CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { ChartDataPoint } from "@/types/types"
import { format } from "date-fns"
import { getDailySummaries2 } from "@/lib/actions"
import { chartConfig, getLastFourMonths } from "@/lib/utils"


export function PLChart () {
  const id = "pie-interactive"
  const [activeMonth, setActiveMonth] = useState(format(new Date(), "MMMM"))
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [totalProfitForMonth, setTotalProfitForMonth] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const data = await getDailySummaries2(activeMonth)
      const totalProfit = data.reduce((sum, day) => {
        const dailyProfit = day.dailyProfit || 0; 
        return sum + dailyProfit;
      }, 0)
      setTotalProfitForMonth(totalProfit)
      setChartData(data)
    }
    getData()
  }, [activeMonth])

  const activeIndex = chartData.findIndex((item) => {
    // Ensure that item.day exists and is a valid date before processing it
    const itemDate = item.day ? new Date(item.day) : null;
    
    // Check if the itemDate is a valid Date object
    if (itemDate && !isNaN(itemDate.getTime())) {
      const itemMonth = format(itemDate, 'MMMM');
      const itemYear = format(itemDate, 'yyyy');
      
      // Compare the item's month and year with the currently active month/year
      return itemMonth === activeMonth && itemYear === format(new Date(), 'yyyy');
    }
    
    // If the itemDate is invalid, return false so it doesn't match
    return false;
  });
  

  const months = getLastFourMonths()

  return (
    <Card data-chart={id} className="flex flex-col w-full"> 
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row space-y-0 space-x-3 pb-0">
        <div className="grid gap-1">
          <CardTitle>Profit</CardTitle>
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
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData.map((item) => {
                const itemDate = new Date(item.day);

                // Ensure the itemDate is valid
                if (!isNaN(itemDate.getTime())) {
                  const monthKey = format(itemDate, "MMMM").toLowerCase();
                  return {
                    ...item,
                    fill: chartConfig[monthKey as keyof typeof chartConfig]?.color || "hsl(var(--default-chart-color))",
                  };
                } else {
                  console.error("Invalid date value in item:", item.day);
                  throw new Error(`Invalid date value: ${item.day}`);
                }
              })}
              dataKey="dailyProfit"
              nameKey="day"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {/* {chartData[activeIndex]?.dailyProfit?.toLocaleString() ?? 0} */}
                          ${ totalProfitForMonth }
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Profit
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
