import ActivityPageClient from '@/components/ActivityPageClient';
import { checkAuthentication } from '@/lib/auth';
import activitiesData from '@/lib/dal/activities';
import { redirect } from 'next/navigation';

export default async function activitiesPage() {
    const isAuthenticated = await checkAuthentication();

    if (!isAuthenticated) {
        redirect('/log-in');
    }
    const activities = await activitiesData();

    console.log(activities);

    return (
        <main className='px-8 py-4'>
            <ActivityPageClient activities={activities} />
        </main>
    );
}
