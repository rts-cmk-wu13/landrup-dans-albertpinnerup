import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function createAccessToken(username: string, password: string): Promise<string> {
    const response = await fetch(`${process.env.BASE_API_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch access token');
    }

    const data = await response.json();

    console.log('Access token response:', data);

    return data.token;
}
