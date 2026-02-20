import ActivityCard from '@/components/ActivityCard';
import activitiesData from '@/lib/dal/activities';
import assetsData from '@/lib/dal/assets';

export default async function activitiesPage() {
    const activities = await activitiesData();

    console.log(activities);

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Aktiviteter</h1>
            <p>Vis en liste over aktiviteter her.</p>

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
    );
}
