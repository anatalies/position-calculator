import React from "react"
import { ActionButtonProps } from "@/types/types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { RecordTrade } from "@/lib/actions"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button"

const ActionButton: React.FC<ActionButtonProps> = ({onClick}) => (
  <Dialog>
    <DialogTrigger>
      <div 
          onClick={onClick}
          className="fixed bottom-10 right-10 text-white p-5 rounded-md shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition transform hover:scale-105 bg-main-400"
      >
          <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75v14.5M4.75 12h14.5" />
      </svg>
      </div>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-main-900">Record Trade</DialogTitle>
        <DialogDescription>
          This will record and update your stats accordingly😉
        </DialogDescription>
      </DialogHeader>
      <Form/>
    </DialogContent>
  </Dialog>
)

export default ActionButton

function Form () {
  return (
    <form action={RecordTrade} className="flex flex-col space-y-4 p-1 my-1">
      <div className="flex justify-around">
        <div className="flex flex-col space-y-2">
          <Label>Currency Pair</Label>
          <SelectPair/>
        </div>
        <div className="flex flex-col space-y-2">
          <Label>Lot Size</Label>
          <Input/>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="flex flex-col space-y-2">
          <Label>Entry Price</Label>
          <Input/>
        </div>
        <div className="flex flex-col space-y-2">
          <Label>Exit Price</Label>
          <Input/>
        </div>
      </div>
      <div className="flex justify-around">
        <div className="flex flex-col space-y-2">
          <Label>Profit/Loss (USD)</Label>
          <Input/>
        </div>
        <div className="flex flex-col space-y-2">
          <Label>Exit Price</Label>
          <Input/>
        </div>
      </div>
     <Button>Save</Button>
    </form>
  )
}

function SelectPair () {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select pair" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Currencies</SelectLabel>
          <SelectItem value="AUD/CAD">AUD/CAD</SelectItem>
          <SelectItem value="EUR/USD">EUR/USD</SelectItem>
          <SelectItem value="USDCHF">USDCHF</SelectItem>
          <SelectItem value="GBP/USD">GBP/USD</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}