'use server';

import { emailSchema } from '../schemas/schema';
import * as z from 'zod';

export type NewsletterState = {
    success: boolean;
    errors?: string[];
};

export async function subscribeToNewsletter(
    _prevState: NewsletterState,
    formData: FormData
): Promise<NewsletterState> {
    const email = formData.get('email');
    const result = emailSchema.safeParse(email);

    console.log('Email value:', email);

    if (!result.success) {
        const zodError = z.treeifyError(result.error);

        console.log('Zod validation error:', zodError);

        return { success: false, errors: zodError.errors };
    }

    console.log('Validation result:', result);

    const response = await fetch(`http://localhost:4000/api/v1/newsletter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(result.data),
    });

    if (!response.ok) {
        return { success: false, errors: ['Could not subscribe to newsletter'] };
    }

    return { success: true };
}
