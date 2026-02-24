import CalendarCard from '@/components/CalendarCard';
import activitiesData from '@/lib/dal/activities';
import getUser from '@/lib/dal/user';
import { ActivityType, UserType } from '@/lib/types/types';

export default async function ProfilePage() {
    const userData: UserType = await getUser();

    const allActivities = await activitiesData();

    let activities: ActivityType[] = [];

    if (userData.role === 'instructor') {
        activities = allActivities.filter(
            (activity: ActivityType) => activity.instructorId === userData.id
        );
    } else {
        activities = allActivities.filter((activity: ActivityType) =>
            activity?.users?.some((user: UserType) => user.id === userData.id)
        );
    }

    return (
        <section className=''>
            <section className='flex flex-col gap-4 px-4 py-8'>
                <h3 className='font-medium'>
                    {userData.role === 'instructor' ? 'Mine hold' : 'Tilmeldte hold'}
                </h3>
                {activities?.map((activity: ActivityType) => {
                    return (
                        <CalendarCard
                            key={activity.id}
                            activity={activity}
                            role={userData?.role === 'instructor' ? 'instructor' : 'default'}
                        />
                    );
                })}
            </section>
        </section>
    );
}
