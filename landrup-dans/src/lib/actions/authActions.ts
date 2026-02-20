'use server';

import { cookies } from 'next/headers';
import { LogInErrors, SignUpErrors, signUpSchema } from '../schemas/schema';
import { createAccessToken } from '../utils';
import { redirect } from 'next/navigation';
import { z } from 'zod/v4';

export type SignUpState = {
    success: boolean;
    fieldErrors: SignUpErrors;
    formErrors?: string[];
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
        rememberMe: rawValues.rememberMe,
        role: 'default',
    };

    const result = signUpSchema.safeParse(values);

    console.log('Form values:', values);
    console.log('Zod validation result:', result);
    const formErrors: string[] = [];

    if (!result.success) {
        const zodError = z.treeifyError(result.error);

        console.log('Zod validation error:', zodError);
        if (values.password !== formData.get('confirmPassword')) {
            formErrors.push('Passwords do not match');
        }

        return {
            success: false,
            fieldErrors: {
                username: zodError.properties?.username,
                password: zodError.properties?.password,
                firstName: zodError.properties?.firstName,
                lastName: zodError.properties?.lastName,
                age: zodError.properties?.age,
            },
            formErrors: formErrors,
        };
    }

    if (values.password !== formData.get('confirmPassword')) {
        formErrors.push('Passwords do not match');
    }

    if (formErrors.length > 0) {
        return {
            success: false,
            fieldErrors: {},
            formErrors,
        };
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
        return {
            success: false,
            fieldErrors: {},
            formErrors: errorData.errors || ['Signup failed'],
        };
    }

    if (values.rememberMe === 'on') {
        const { accessToken, userId, expiresIn } = await createAccessToken(
            result.data.username,
            result.data.password
        );
        cookieStore.set('accessToken', accessToken, {
            expires: expiresIn ? new Date(Date.now() + expiresIn * 1000) : undefined,
        });
        cookieStore.set('userId', String(userId), {
            expires: expiresIn ? new Date(Date.now() + expiresIn * 1000) : undefined,
        });

        redirect('/profil');
    } else {
        redirect('/log-in');
    }
}

export type LogInState = {
    success: boolean;
    fieldErrors: LogInErrors;
    formErrors?: string[];
};

export async function logInAction(_prevState: LogInState, formData: FormData): Promise<LogInState> {
    const cookieStore = await cookies();

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const rememberMe = formData.get('rememberMe') === 'on';

    try {
        const { accessToken, userId, expiresIn } = await createAccessToken(username, password);

        if (rememberMe) {
            cookieStore.set('accessToken', accessToken, {
                expires: expiresIn ? new Date(Date.now() + expiresIn * 1000) : undefined,
            });
            cookieStore.set('userId', String(userId), {
                expires: expiresIn ? new Date(Date.now() + expiresIn * 1000) : undefined,
            });
        } else {
            cookieStore.set('accessToken', accessToken);
            cookieStore.set('userId', String(userId));
        }

        redirect('/profil');
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            fieldErrors: {},
            formErrors: ['Invalid username or password'],
        };
    }
}
