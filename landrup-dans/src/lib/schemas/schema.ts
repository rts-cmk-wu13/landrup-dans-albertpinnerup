import { z } from 'zod/v4';

type FieldError = {
    errors: string[];
};

export const emailSchema = z.email({ message: 'Invalid email address' });

export type EmailError = {
    email?: FieldError;
};

export const contactFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: emailSchema,
    message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ContactFormErrors = {
    name?: FieldError;
    email?: FieldError;
    message?: FieldError;
};

export const signUpSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
    age: z.coerce.number().int().positive({ message: 'Age must be a positive integer' }),
    rememberMe: z.boolean().optional(),
    role: z.enum(['default', 'instructor'], {
        message: 'Role must be either default or instructor',
    }),
});

export type SignUpData = z.infer<typeof signUpSchema>;

export type SignUpErrors = {
    username?: FieldError;
    password?: FieldError;
    firstName?: FieldError;
    lastName?: FieldError;
    age?: FieldError;
    role?: FieldError;
};

export const logInSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    rememberMe: z.boolean().optional(),
});

export type LogInData = z.infer<typeof logInSchema>;

export type LogInErrors = {
    username?: FieldError;
    password?: FieldError;
};
