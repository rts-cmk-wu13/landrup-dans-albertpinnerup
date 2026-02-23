'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, List, UserRound, type LucideIcon } from 'lucide-react';

type NavItem = {
    id: string;
    label: string;
    href: string;
    icon: LucideIcon;
};

const navItems: NavItem[] = [
    { id: 'home', label: 'Home', href: '/', icon: House },
    { id: 'activities', label: 'Activities', href: '/aktiviteter', icon: List },
    { id: 'profile', label: 'Profile', href: '/profil', icon: UserRound },
];

export default function NavBar() {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href || pathname.includes(`${href}/`);
    const disablePath = ['/log-in', '/sign-up'];

    return (
        <nav className={`bg-secondary ${disablePath.includes(pathname) ? 'hidden' : ''}`}>
            <ul className='flex items-center justify-between px-8 h-16 gap-4 dark:bg-[#111625]'>
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;

                    return (
                        <li key={item.id}>
                            <Link
                                href={item.href}
                                className={active ? 'text-black' : 'text-[#6F6F6F]'}
                            >
                                <Icon size={24} aria-hidden='true' />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
