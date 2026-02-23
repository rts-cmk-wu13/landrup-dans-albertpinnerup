import ActivityDetailsClient from '@/components/ActivityDetailsClient';
import activitiesData from '@/lib/dal/activities';
import getUser from '@/lib/dal/user';
import { ActivityType } from '@/lib/types/types';
import { cookies } from 'next/headers';

export default async function activityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const cookieStore = await cookies();

    const activity: ActivityType = await activitiesData(id);
    const userId = cookieStore.get('userId')?.value;

    const user = await getUser();

    const initialJoinedState = activity?.users?.some((user) => user.id === Number(userId)) || false;

    return (
        <ActivityDetailsClient
            activity={activity}
            activityId={id}
            initialJoinedState={initialJoinedState}
            age={user.age}
        />
    );
}
