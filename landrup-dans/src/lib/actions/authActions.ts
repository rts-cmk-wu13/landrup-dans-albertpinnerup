'use server';

import z from 'zod';
import { signUpSchema } from '../schemas/schema';

export type SignUpState = {
    success: boolean;
    errors?: string[];
};

export async function signUpAction(
    _prevState: SignUpState,
    formData: FormData
): Promise<SignUpState> {
    const values = Object.fromEntries(formData.entries());

    const result = signUpSchema.safeParse(values);

    if (!result.success) {
        const zodError = z.treeifyError(result.error);
        return { success: false, errors: zodError.errors };
    }

    console.log('Validation result:', result);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            username: values.username,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            age: values.age,
            role: 'default',
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        return { success: false, errors: errorData.errors || ['Signup failed'] };
    }

    return { success: true, errors: [] };
}
