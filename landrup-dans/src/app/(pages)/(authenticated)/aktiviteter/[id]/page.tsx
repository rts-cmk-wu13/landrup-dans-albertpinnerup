import ActivityDetailsClient from '@/components/ActivityDetailsClient';
import activitiesData from '@/lib/dal/activities';
import getUser from '@/lib/dal/user';
import { ActivityType } from '@/lib/types/types';
import { cookies } from 'next/headers';

const initialState = {
    joined: false,
};

export default async function activityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const cookieStore = await cookies();
    const { id } = await params;

    const activity: ActivityType = await activitiesData(id);
    const userId = cookieStore.get('userId')?.value;

    const user = await getUser();

    console.log('user:', user);

    const initialJoinedState = activity?.users?.some((user) => user.id === Number(userId)) || false;

    console.log('initialJoinedState:', initialJoinedState);

    return (
        <ActivityDetailsClient
            activity={activity}
            activityId={id}
            initialJoinedState={initialJoinedState}
            age={user.age}
        />
    );
}
