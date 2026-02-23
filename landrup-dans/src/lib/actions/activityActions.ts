'use server';
import { redirect } from 'next/navigation';
import { checkAuthentication } from '../auth';
import { cookies } from 'next/headers';

export type ToggleActivityParticipationResult = {
    joined: boolean;
};

export default async function toggleActivityParticipation(
    prevState: ToggleActivityParticipationResult,
    activityId: string
) {
    const cookieStore = await cookies();
    const isAuthenticated = await checkAuthentication();

    if (!isAuthenticated) {
        redirect('/log-in');
    }

    const userId = cookieStore.get('userId')?.value;
    const accessToken = cookieStore.get('accessToken')?.value;

    const method = prevState.joined ? 'DELETE' : 'POST';

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/activities/${activityId}`,
        {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!response.ok) {
        return {
            joined: prevState.joined,
        };
    }

    return {
        joined: !prevState.joined,
    };
}
