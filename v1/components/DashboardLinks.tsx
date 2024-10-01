'use client'

import { BarChartIcon, PersonIcon, PlusIcon } from "@radix-ui/react-icons"
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        name: 'Calculate',
        href: '/dashboard/calculators',
        icon: PlusIcon
    },
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
                    'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                    {
                        'bg-sky-100 text-blue-600': pathname === link.href,
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