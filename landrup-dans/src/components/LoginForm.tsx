'use client';
import { Button } from '@/components/ui/button';
import { logInAction } from '@/lib/actions/authActions';
import { useActionState } from 'react';
import Link from 'next/link';

const initialState = {
    success: false,
    fieldErrors: {},
    formErrors: [],
};

export default function LogInForm() {
    const [state, formAction, isPending] = useActionState(logInAction, initialState);
    return (
        <section className='flex flex-col w-full px-6 py-4 gap-4'>
            <h1>Log ind</h1>
            {state.formErrors && <p className='text-red-500 text-xl'>{state.formErrors}</p>}

            <form action={formAction} className='flex flex-col w-full gap-4 justify-between'>
                <input
                    type='text'
                    name='username'
                    placeholder='Brugernavn'
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
                <div className='flex items-center gap-2 justify-center'>
                    <label htmlFor='rememberMe'>Husk mig?</label>
                    <input type='checkbox' name='rememberMe' id='rememberMe' />
                </div>

                <Button type='submit' disabled={isPending} className='mx-8 p-4'>
                    {isPending ? 'Logger ind...' : 'Log ind'}
                </Button>
                <p>
                    Er du endnu ikke bruger?
                    <span>
                        <Link href='/sign-up' className='ml-2 underline'>
                            opret dig her.
                        </Link>
                    </span>
                </p>
            </form>
        </section>
    );
}
