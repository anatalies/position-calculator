'use client'

import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import TradeForm from "./TradeForm"

const ActionButton: React.FC = () => (
  <Dialog>
    <DialogTrigger>
      <div 
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
      <TradeForm/>
    </DialogContent>
  </Dialog>
)

export default ActionButton