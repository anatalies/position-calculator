import ActionButton from "@/components/ActionButton";
import { DatePicker } from "@/components/DatePicker";
import { MetricsTab } from "@/components/MetricsTab";

export default function Page () {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
                <h1 className="text-md md:text-lg font-bold text-main-900">Account Overview</h1>
                <DatePicker/>
            </div>
            <MetricsTab/>
            <ActionButton onClick={undefined}/>
        </div>
    )
}