import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import DashBoardLinks from "./DashboardLinks";

export default function SideBar() {
    return (
        <div className=" bg-main-100 w-1/6 flex flex-col items-center space-y-10 py-2">
            <div className="font-bold drop-shadow-md">
                V1
            </div>
            <div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col space-y-2">
                <DashBoardLinks/>
            </div>
            <div className="">
                <Button variant={'ghost'}>Log Out</Button>
            </div>
        </div>
    )
}