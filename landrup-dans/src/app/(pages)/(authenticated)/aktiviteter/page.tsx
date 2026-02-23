import ActivityCard from '@/components/ActivityCard';
import { checkAuthentication } from '@/lib/auth';
import activitiesData from '@/lib/dal/activities';
import assetsData from '@/lib/dal/assets';
import { redirect } from 'next/navigation';

export default async function activitiesPage() {
    const isAuthenticated = await checkAuthentication();

    if (!isAuthenticated) {
        redirect('/log-in');
    }
    const activities = await activitiesData();

    console.log(activities);

    return (
        <main className='p-4'>
            <h1 className='mb-4'>Aktiviteter</h1>

            <div className='flex flex-col gap-6'>
                {activities.map((activity: any) => {
                    return (
                        <ActivityCard
                            key={activity.id}
                            imgUrl={activity.asset.url}
                            name={activity.name}
                            minAge={activity.minAge}
                            maxAge={activity.maxAge}
                            id={activity.id}
                        />
                    );
                })}
            </div>
        </main>
    );
}
