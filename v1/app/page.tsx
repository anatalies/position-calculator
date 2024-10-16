import { DividerVerticalIcon, GitHubLogoIcon, InstagramLogoIcon, MoonIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { ChartCandlestickIcon, Database } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-screen p-6 pb-18 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <div className="flex justify-between h-auto">
			<div className="flex items-center space-x-6">
				<div className="flex items-center space-x-1 font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-700 drop-shadow-md hover:drop-shadow-lg transition"><MoonIcon className="text-pink-600"/><h1>The Lot Thickens</h1></div>
				<div><p className="text-sm"> / aromibenard@gmail.com</p></div>
			</div>
			<div className="flex space-x-6 items-center">
				<p className="hover:cursor-pointer hover:underline hover:underline-offset-2">Help</p>
				<Link href={'/dashboard'} className="bg-purple-600 p-2 px-3 font-medium text-white shadow-md rounded-lg hover:scale-105 transition hover:shadow-lg hover:opacity-90">Get Started</Link>
			</div>
     </div>
	  <div className="h-5/6 flex flex-col">
	  	<div className="h-1/4 grid items-center">
			<h2 className="flex place-content-center -mb-4 text-gray-600">Get started today</h2>
			<h1 className="text-2xl flex place-content-center font-semibold">
				Where every trade tells a tale
				<svg
					className="absolute w-28 h-4 inline-flex -mr-[16rem] mt-[1.2rem]"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 100 20"
					preserveAspectRatio="none"
				>
					<path
						d="M0 15 Q25 5 50 10 T100 15"
						stroke="#9f5ea5"
						strokeWidth="4"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</h1>
		</div>
		<div className="h-3/4 w-3/4 mx-auto p-1 grid grid-cols-3 gap-2">
			<div className=" grid grid-rows-2 gap-2">
				<div className="grid grid-cols-2 gap-2">
					<div className="bg-purple-500 rounded flex flex-col p-3 shadow-sm hover:scale-95 transition hover:shadow-md hover:cursor-pointer">
						<div className="flex justify-end"><Database className="text-gray-800"/></div>
						<div className="flex flex-col items-center place-content-center flex-1"><h1 className="font-semibold -mt-3 text-lg text-gray-800">Data</h1></div>
					</div>
					<div className="bg-teal-500 rounded flex flex-col p-3 shadow-sm hover:scale-95 transition hover:shadow-md hover:cursor-pointer">
						<div className="flex flex-col items-center place-content-center flex-1"><h1 className="font-semibold -mb-3 text-lg text-gray-800">Analytics</h1></div>
						<div className=""><ChartCandlestickIcon className="text-gray-800"/></div>
					</div>
				</div>
				<div className="bg-yellow-500 rounded">

				</div>
			</div>
			<div className="bg-fuchsia-400 relative rounded p-1 shadow-sm hover:scale-95 transition hover:shadow-md hover:cursor-pointer">
				<div className="absolute flex flex-col flex-1">
					<h2 className="font-semibold drop-shadow-md text-lg text-center mt-20 text-gray-800">Start your journaling journey today!😄</h2>
				</div>
				<Image 
					src={'/analytics.svg'}
					height={300}
					width={600}
					alt="get started image"
					className="object-cover h-full w-full"
				/>
			</div>
			<div className="grid grid-rows-2 gap-2">
				<div className="bg-red-400 rounded">
					
				</div>
				<div className="bg-sky-400 rounded">

				</div>
			</div>
		</div>
	  </div>
	  <div className="flex h-auto justify-between items-center">
			<div className="flex">
				<InstagramLogoIcon className="hover:text-purple-600 transition cursor-pointer size-5"/>
				<DividerVerticalIcon className="size-5"/>
				<GitHubLogoIcon className="hover:text-purple-600 transition cursor-pointer size-5"/>
				<DividerVerticalIcon className="size-5"/>
				<TwitterLogoIcon className="hover:text-purple-600 transition cursor-pointer size-5"/>
			</div>
			<div><Link href={'sign-in'} className="hover:underline transition hover:underline-offset-2">Privacy Policy</Link></div>
	  </div> 
    </div>
  )
}