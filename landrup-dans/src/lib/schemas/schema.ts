import * as z from 'zod';

export const emailSchema = z.email({ message: 'Invalid email address' });
export const contactFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: emailSchema,
    message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
