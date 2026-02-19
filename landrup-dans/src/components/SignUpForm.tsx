'use client';
import { signUpAction } from '@/lib/actions/authActions';
import { useActionState } from 'react';
import { Button } from './ui/button';

const initialState = {
    success: false,
    errors: [],
};

export default function SignUpForm() {
    const [state, formAction, isPending] = useActionState(signUpAction, initialState);

    console.log('state:', state, 'errors:', state.errors);
    console.log(process.env.NEXT_PUBLIC_API_URL);

    return (
        <section className='flex flex-col  gap-4'>
            <h1>Opret bruger</h1>
            <form action={formAction} className='flex flex-col w-full gap-4 justify-between'>
                <input
                    type='text'
                    name='firstName'
                    placeholder='Fornavn'
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                <input
                    type='text'
                    name='lastName'
                    placeholder='Efternavn'
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                <input
                    type='text'
                    name='username'
                    placeholder='Brugernavn'
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                <input
                    type='number'
                    name='age'
                    placeholder='Alder'
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Adgangskode'
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                <input
                    type='password'
                    name='confirmPassword'
                    placeholder='Gentag adgangskode'
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                <Button type='submit' disabled={isPending} className='mx-8 p-4'>
                    {isPending ? 'Opretter bruger...' : 'Opret bruger'}
                </Button>
            </form>
        </section>
    );
}
