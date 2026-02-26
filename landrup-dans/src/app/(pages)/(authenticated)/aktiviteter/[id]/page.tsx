import ActivityDetailsClient from '@/components/ActivityDetailsClient';
import activitiesData from '@/lib/dal/activities';
import getUser from '@/lib/dal/user';
import { ActivityType } from '@/lib/types/types';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function activityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const activityId = Number(id);

    if (!Number.isInteger(activityId) || activityId <= 0) {
        notFound();
    }

    const cookieStore = await cookies();

    const activity: ActivityType = await activitiesData(String(activityId));
    if (!activity?.id) {
        notFound();
    }
    const userId = cookieStore.get('userId')?.value;

    const user = await getUser();

    const initialJoinedState = activity?.users?.some((user) => user.id === Number(userId)) || false;

    return (
        <ActivityDetailsClient
            activity={activity}
            activityId={activity.id}
            initialJoinedState={initialJoinedState}
            age={user.age}
            role={user.role}
        />
    );
}
