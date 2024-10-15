'use client'

import { BarChartIcon, PersonIcon} from "@radix-ui/react-icons"
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        name: 'Metrics',
        href: '/dashboard/metrics',
        icon: BarChartIcon
    },
    {
        name: 'Account',
        href: '/dashboard/account',
        icon: PersonIcon
    }
]

export default function DashBoardLinks() {
    const pathname = usePathname()
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                    'flex h-[46px] text-white grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:text-violet-800 md:flex-none md:justify-start md:p-2 md:px-3 transition',
                    {
                        ' text-violet-800': pathname === link.href,
                    },
                    )}
                >
                    <LinkIcon className="w-6" />
                    <p className="hidden md:block">{link.name}</p>
                </Link>
                );
            })}    
        </>
    )
}