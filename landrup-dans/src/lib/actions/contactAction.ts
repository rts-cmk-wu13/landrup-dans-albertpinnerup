import { contactFormSchema, getZodErrorMessages } from '../schemas/schema';

export type ContactState = {
    success: boolean;
    errors?: string[];
};

export default async function contactAction(
    _prevState: ContactState,
    formData: FormData
): Promise<ContactState> {
    const values = Object.fromEntries(formData.entries());
    const result = contactFormSchema.safeParse(values);

    if (!result.success) {
        return { success: false, errors: getZodErrorMessages(result.error) };
    }

    console.log('Validation result:', result);

    await fetch(`http://localhost:4000/api/v1/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: result.data.name,
            email: result.data.email,
            message: result.data.message,
        }),
    });

    return { success: true };
}
