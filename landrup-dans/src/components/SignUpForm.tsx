'use client';
import { signUpAction, type SignUpState } from '@/lib/actions/authActions';
import { useActionState } from 'react';
import { Button } from './ui/button';

const initialState: SignUpState = {
    success: false,
    fieldErrors: {},
    formErrors: [],
};

export default function SignUpForm() {
    const [state, formAction, isPending] = useActionState(signUpAction, initialState);

    console.log('state:', state);
    console.log(process.env.NEXT_PUBLIC_API_URL);

    return (
        <section className='flex flex-col w-full px-6 py-4 gap-4'>
            <h1>Opret bruger</h1>
            <form action={formAction} className='flex flex-col w-full gap-4 justify-between'>
                <input
                    type='text'
                    name='firstName'
                    placeholder='Fornavn'
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                {state.fieldErrors?.firstName?.errors?.[0] && (
                    <p className='text-red-500 text-sm'>{state.fieldErrors.firstName.errors[0]}</p>
                )}
                <input
                    type='text'
                    name='lastName'
                    placeholder='Efternavn'
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                {state.fieldErrors?.lastName?.errors?.[0] && (
                    <p className='text-red-500 text-sm'>{state.fieldErrors.lastName.errors[0]}</p>
                )}

                <input
                    type='text'
                    name='username'
                    placeholder='Brugernavn'
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                {state.fieldErrors?.username?.errors?.[0] && (
                    <p className='text-red-500 text-sm'>{state.fieldErrors.username.errors[0]}</p>
                )}

                <input
                    type='number'
                    name='age'
                    placeholder='Alder'
                    min={0}
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                {state.fieldErrors?.age?.errors?.[0] && (
                    <p className='text-red-500 text-sm'>{state.fieldErrors.age.errors[0]}</p>
                )}

                <input
                    type='password'
                    name='password'
                    placeholder='Adgangskode'
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                {state.fieldErrors?.password?.errors?.[0] && (
                    <p className='text-red-500 text-sm'>{state.fieldErrors.password.errors[0]}</p>
                )}

                <input
                    type='password'
                    name='confirmPassword'
                    placeholder='Gentag adgangskode'
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                {state.formErrors && <p className='text-red-500 text-xl'>{state.formErrors}</p>}

                <div className='flex items-center gap-2 justify-center'>
                    <label htmlFor='rememberMe'>Husk mig?</label>
                    <input type='checkbox' name='rememberMe' id='rememberMe' />
                </div>
                <Button type='submit' disabled={isPending} className='mx-8 p-4'>
                    {isPending ? 'Opretter bruger...' : 'Opret bruger'}
                </Button>
            </form>
        </section>
    );
}
