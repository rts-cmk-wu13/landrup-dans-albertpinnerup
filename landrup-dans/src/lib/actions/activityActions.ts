'use server';
import { redirect } from 'next/navigation';
import { checkAuthentication } from '../auth';
import { cookies } from 'next/headers';
import { ActivityType } from '../types/types';

export type ToggleActivityParticipationResult = {
    joined: boolean;
};

export default async function toggleActivityParticipation({
    activityId,
    join,
}: {
    activityId: number;
    join: boolean;
}): Promise<{ ok: boolean }> {
    const cookieStore = await cookies();
    const isAuthenticated = await checkAuthentication();

    if (!isAuthenticated) {
        redirect('/log-in');
    }

    const userId = cookieStore.get('userId')?.value;
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!Number.isInteger(activityId) || activityId <= 0) {
        return { ok: false };
    }

    const method = join ? 'POST' : 'DELETE';

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/activities/${Number(activityId)}`,
        {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    // if (!response.ok) {
    //     return {
    //         joined: input.join, // Return the original state if the request fails
    //     };
    // }

    return {
        ok: response.ok,
    };
}
