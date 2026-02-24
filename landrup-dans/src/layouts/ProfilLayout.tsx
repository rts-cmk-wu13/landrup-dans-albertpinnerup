import UserIcon from '@/components/ui/UserIcon';
import getUser from '@/lib/dal/user';
import { UserType } from '@/lib/types/types';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export default async function ProfilLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const userData: UserType = await getUser();

    const role = userData.role === 'instructor' ? 'Instruktør' : 'Medlem';

    return (
        <>
            <header className='relative'>
                <div className='bg-primary top-0 fixed w-full flex items-center justify-center  text-white p-6'>
                    <h1 className='text-2xl font-semibold mx-auto'>Min Profil</h1>
                    <Link href='/profil/indstillinger'>
                        <Settings className='text-white' />
                    </Link>
                </div>
                <section className='bg-white flex flex-col items-center gap-4 py-6 mt-[80px]'>
                    <UserIcon className='text-primary' width={64} height={64} />
                    <div className='flex flex-col items-center'>
                        <h2 className='text-primary font-medium'>{userData.firstname}</h2>
                        <p className='text-primary'>{role}</p>
                    </div>
                </section>
            </header>
            <main>{children}</main>
        </>
    );
}
