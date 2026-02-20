import Image from 'next/image';
export default function LoginFlowLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className='flex flex-col items-center justify-center gap-4'>
            <div className='w-full flex flex-col items-center gap-4 z-10 mt-8'>
                <Image src='/assets/landrup_logo.svg' alt='Landrup Logo' width={64} height={64} />
                <Image
                    src='/assets/logo_text.svg'
                    alt='Landrup Text Logo'
                    className='mr-16 w-full'
                    width={365}
                    height={75}
                    loading='eager'
                    priority
                />
            </div>

            {children}
        </main>
    );
}
