import { ActivityType } from '@/lib/types/types';
import Link from 'next/link';

export default function CalendarCard({ activity }: { activity: ActivityType }) {
    return (
        <div className='flex flex-col items-start justify-center gap-2 rounded-2xl bg-white/80 p-4 '>
            <h3 className='text-primary font-semibold'>{activity.name}</h3>
            <p className='text-primary'>
                {activity.weekday} {activity.time}
            </p>
            <Link href={`/aktiviteter/${activity.id}`} className='bg-primary px-6 py-2 rounded-lg'>
                Vis hold
            </Link>
        </div>
    );
}
