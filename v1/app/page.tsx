import Calculator from "@/components/Calculator";
import Link from "next/link";


export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-6 pb-18 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <Calculator/>
     <Link href='/dashboard' className="bg-main-600 p-2 rounded text-white">Dashboard</Link>
    </div>
  )
}
