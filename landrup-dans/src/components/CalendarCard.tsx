import getUser from '@/lib/dal/user';
import { ActivityType, UserType } from '@/lib/types/types';
import Link from 'next/link';

export default async function CalendarCard({
    activity,
    role,
}: {
    activity: ActivityType;
    role?: 'instructor' | 'default';
}) {
    const userData: UserType = await getUser();

    console.log('userData in CalendarCard:', userData);
    console.log('activity in CalendarCard:', activity);

    return (
        <div className='flex flex-col items-start justify-center gap-2 rounded-2xl bg-white/80 p-4 '>
            <h3 className='text-primary font-semibold'>{activity.name}</h3>
            <p className='text-primary'>
                {activity.weekday} {activity.time}
            </p>
            {role === 'instructor' ? (
                <>
                    <div className='flex w-full justify-between'>
                        <p className='text-primary'>Max. deltagere {activity.maxParticipants}</p>
                        <p className='text-primary'>Tilmeldte: {activity.users?.length || 0}</p>
                    </div>
                    <Link
                        href={`/profil/holdoversigt/${activity.id}`}
                        className='bg-primary px-6 py-2 rounded-lg'
                    >
                        Deltagerliste
                    </Link>
                </>
            ) : (
                <Link
                    href={`/aktiviteter/${activity.id}`}
                    className='bg-primary px-6 py-2 rounded-lg'
                >
                    Vis hold
                </Link>
            )}
        </div>
    );
}
