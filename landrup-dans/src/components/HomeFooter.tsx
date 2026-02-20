import { Link } from 'lucide-react';
import Image from 'next/image';

export default function HomeFooter() {
    return (
        <section className='bg-primary text-secondary flex flex-col items-center justify-center py-4 text-center'>
            <Image
                src='/assets/landrup_logo.svg'
                width={64}
                height={64}
                alt='Landrup Dans Logo'
                className='mx-auto mb-2'
            />
            <h3 className='font-medium'>Landrup Dans</h3>
            <address className='not-italic'>Pulsen 8 . 4000 Roskilde</address>
            <a href='tel:35404550'>Tlf. 3540 4550</a>
        </section>
    );
}
