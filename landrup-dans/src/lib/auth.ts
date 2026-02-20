import 'server-only';

import { cookies } from 'next/headers';

export async function createAccessToken(username: string, password: string) {
    const response = await fetch(`${process.env.BASE_API_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch access token');
    }

    const data = await response.json();

    return { accessToken: data.token, userId: data.userId, expiresIn: data.validUntil };
}

export async function checkAuthentication() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    return Boolean(accessToken);
}
