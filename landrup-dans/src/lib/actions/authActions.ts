'use server';

import { cookies } from 'next/headers';
import { getZodErrorMessages, signUpSchema } from '../schemas/schema';
import { createAccessToken } from '../utils';
import { redirect } from 'next/navigation';

export type SignUpState = {
    success: boolean;
    errors?: string[];
};

export async function signUpAction(
    _prevState: SignUpState,
    formData: FormData
): Promise<SignUpState> {
    const cookieStore = await cookies();

    const rawValues = Object.fromEntries(formData.entries());
    const values = {
        username: rawValues.username,
        password: rawValues.password,
        firstName: rawValues.firstName,
        lastName: rawValues.lastName,
        age: rawValues.age,
        role: 'default',
    };

    const result = signUpSchema.safeParse(values);

    console.log('Form values:', values);
    console.log('Zod validation result:', result);

    if (!result.success) {
        return { success: false, errors: getZodErrorMessages(result.error) };
    }

    if (values.password !== formData.get('confirmPassword')) {
        return { success: false, errors: ['Passwords do not match'] };
    }

    console.log('Validation result:', result);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: result.data.username,
            password: result.data.password,
            firstname: result.data.firstName,
            lastname: result.data.lastName,
            age: String(result.data.age),
            role: result.data.role,
        }).toString(),
    });

    if (!response.ok) {
        const errorData = await response.json();
        return { success: false, errors: errorData.errors || ['Signup failed'] };
    }

    const accessToken = await createAccessToken(result.data.username, result.data.password);

    console.log('Access token:', accessToken);

    cookieStore.set('accessToken', accessToken);

    return redirect('/profil');
}
