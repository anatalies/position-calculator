import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashBoardLinks from "./DashboardLinks";

export default function SideBar() {
    return (
        <div className=" bg-slate-800 w-1/6 flex flex-col items-center space-y-10 py-2">
            <div className="font-bold text-xl drop-shadow-md my-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">
                Dashboard
            </div>
            <div>
                
            </div>
            <div className="flex flex-col space-y-2">
                <DashBoardLinks/>
            </div>
            <div className="">

            </div>
        </div>
    )
}