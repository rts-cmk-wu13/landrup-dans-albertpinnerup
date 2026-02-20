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
        <Link href={`aktiviteter/${id}`} className='flex flex-col  gap-4'>
            <h3>{name}</h3>
            <Image src={imgUrl} alt={`${name} Image`} width={300} height={200} className='w-full' />
            <p>
                {minAge}-{maxAge} år
            </p>
        </Link>
    );
}
