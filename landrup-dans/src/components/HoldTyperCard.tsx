import Image from 'next/image';

type HoldTyperCardProps = {
    holdtype: string;
    imgSrc?: string;
    children?: React.ReactNode;
};

export default function HoldTyperCard({ holdtype, imgSrc, children }: HoldTyperCardProps) {
    return (
        <section className='flex flex-col  gap-4'>
            <h3>{holdtype}</h3>
            <Image
                src={`/assets/${imgSrc ?? ''}`}
                alt={`${holdtype} Image`}
                width={300}
                height={200}
                className='w-full'
            />
            {children}
        </section>
    );
}
