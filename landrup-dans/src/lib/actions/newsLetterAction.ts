'use server';

export async function subscribeToNewsletter(formData: FormData) {
    const email = formData.get('email') as string;
    const values = Object.fromEntries(formData);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/newsletter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
}
