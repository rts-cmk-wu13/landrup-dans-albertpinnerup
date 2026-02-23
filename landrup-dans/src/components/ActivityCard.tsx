import activitiesData from '@/lib/dal/activities';
import Image from 'next/image';
import Link from 'next/link';

type ActivityCardProps = {
    name: string;
    imgUrl: string;
    minAge: number;
    maxAge: number;
    id?: number;
};

export default function activityCard({
    imgUrl,
    name,
    minAge,
    maxAge,
    id,
    ...props
}: ActivityCardProps) {
    return (
        <Link
            href={`aktiviteter/${id}`}
            className='flex flex-col  gap-4 relative aspect-360/344 overflow-hidden rounded-t-[39px] rounded-bl-[39px]'
            {...props}
        >
            <Image src={imgUrl} alt={`${name} Image`} fill objectFit='cover' className='w-full' />
            <div className='z-10 bg-[#003147]/75 mt-auto px-6 py-5 rounded-tr-[39px]'>
                <h4 className='font-bold'>{name}</h4>
                <p>
                    {minAge}-{maxAge} år
                </p>
            </div>
        </Link>
    );
}
