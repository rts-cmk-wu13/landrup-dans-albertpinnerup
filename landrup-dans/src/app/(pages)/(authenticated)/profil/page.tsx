import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken')?.value;
    const userId = cookieStore.get('userId')?.value;

    if (!accessToken) {
        redirect('/log-in');
    }

    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const userData = await userResponse.json();

    console.log('User data:', userData);

    return (
        <section className='flex flex-col items-center justify-center gap-4'>
            <h1>Min profil</h1>
            <p>Her kan du se og redigere dine profiloplysninger.</p>
        </section>
    );
}
