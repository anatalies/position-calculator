import ActionButton from "@/components/ActionButton";
import { DatePicker } from "@/components/DatePicker";
import { MetricsTab } from "@/components/MetricsTab";
import { HelpCircleIcon } from "lucide-react";

export default function Page ({
    searchParams } : { searchParams? : {
      query?: string,
      page?: string,
    }  
  }) {
    const query = searchParams?.query || ''
    const currentPage = Number((searchParams?.page)) || 1

    return (
        <div className="flex flex-col space-y-3 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-md md:text-lg font-bold text-purple-400">Account Overview</h1>
                <HelpCircleIcon className="size-7 text-purple-400"/>
            </div>
            <MetricsTab currentPage={currentPage} query={query}/>
            <ActionButton/>
        </div>
    )
}