import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function getUser() {
    'use server';
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    const accessToken = cookieStore.get('accessToken')?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        redirect('/log-in');
    }

    const userData = await response.json();
    return userData;
}
