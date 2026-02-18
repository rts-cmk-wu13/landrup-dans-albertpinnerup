import Image from 'next/image';
import { Button } from './ui/button';

export default function Hero() {
    return (
        <section className='relative p-6 flex min-h-svh w-full flex-col items-center justify-between gap-6 overflow-hidden font-sans'>
            <Image
                src='/assets/heroimg.jpg'
                alt='Hero Image'
                fill={true}
                className='-z-10 object-cover'
            />

            <div className='w-full flex flex-col items-center gap-4 z-10'>
                <Image src='/assets/landrup_logo.svg' alt='Landrup Logo' width={64} height={64} />
                <Image
                    src='/assets/logo_text.svg'
                    alt='Landrup Text Logo'
                    className='mr-16 w-full'
                    width={365}
                    height={75}
                />
            </div>
            <Button className='z-10 text-lg max-w-[240px] w-full mt-auto'>Log ind</Button>
            <a href='#holdtyper' className='z-10'>
                <Image
                    src='/assets/arrow_down.svg'
                    alt='Scroll Down Indicator'
                    width={48}
                    height={48}
                    className='animate-bounce'
                />
            </a>
        </section>
    );
}
