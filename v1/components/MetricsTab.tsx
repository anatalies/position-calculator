import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { EyeOpenIcon, PlusIcon } from "@radix-ui/react-icons"
import React from "react"
import { AccountChart } from "./AccountChart"

export function MetricsTab() {
  return (
    <Tabs defaultValue="overview" className="">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="charts">Charts</TabsTrigger>
        <TabsTrigger value="tradeLog">Trade Log</TabsTrigger>
        <TabsTrigger value="rabbitHole">Rabbit Hole</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="flex flex-col space-y-3">
        <div className="flex space-x-2">
          <CustomCard value={2345} label="Balance" icon={<EyeOpenIcon/>}/>
          <CustomCard value={150} label="Profit" icon={<PlusIcon/>} />
          <CustomCard value={12} label="Avg P/L" icon={<PlusIcon/>} />
        </div>
        <div className="">
          <AccountChart/>
        </div>
      </TabsContent>
      <TabsContent value="charts">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="charts" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

interface CustomCardProps {
    label: string
    value: number
    icon: React.ReactNode
    comment?: string
}

const CustomCard:React.FC<CustomCardProps> = ({label, value, icon, comment}) => {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="text-main-500">{label}</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <h1 className="font-extrabold text-main-900 flex items-center text-2xl">{value}<span className="mx-1">{icon}</span></h1>
                </div>
            </CardContent>
            <CardFooter>
                <p>{comment}</p>
            </CardFooter>
        </Card>
    )
}