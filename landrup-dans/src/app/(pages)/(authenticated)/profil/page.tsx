import CalendarCard from '@/components/CalendarCard';
import getUser from '@/lib/dal/user';
import { ActivityType, UserType } from '@/lib/types/types';

export default async function ProfilePage() {
    const userData: UserType = await getUser();

    const activities = userData.activities;

    return (
        <section className=''>
            <section className='flex flex-col gap-4 px-4 py-8'>
                <h3 className='font-medium'>
                    {userData.role === 'instructor' ? 'Mine hold' : 'Tilmeldte hold'}
                </h3>
                {activities?.map((activity: ActivityType) => {
                    return <CalendarCard key={activity.id} activity={activity} />;
                })}
            </section>
        </section>
    );
}
