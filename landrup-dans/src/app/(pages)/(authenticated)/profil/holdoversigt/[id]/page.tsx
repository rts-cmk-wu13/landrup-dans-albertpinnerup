import activitiesData from '@/lib/dal/activities';
import { ActivityType, UserType } from '@/lib/types/types';
import UserIcon from '@/components/ui/UserIcon';

export default async function HoldoversigtPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const activity: ActivityType = await activitiesData(id);

    console.log('Activity in HoldoversigtPage:', activity);

    return (
        <section className='flex flex-col gap-4 px-4 py-8'>
            <h3 className='font-medium'>{activity.name}</h3>
            {/* Her kan du tilføje indholdet for holdoversigten baseret på id */}
            <p>Deltagere:</p>
            {activity.users?.map((user: UserType) => (
                <div key={user.id} className='bg-white/80 py-2 px-4 rounded-lg'>
                    <p className='text-primary flex items-center gap-2'>
                        <span>
                            <UserIcon />
                        </span>
                        {user.firstname} {user.lastname}
                        <span className='ml-auto'>{user.age} år</span>
                    </p>
                </div>
            ))}
        </section>
    );
}
