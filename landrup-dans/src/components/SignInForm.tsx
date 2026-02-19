import { signUpAction } from '@/lib/actions/authActions';
import { useActionState } from 'react';
import { Button } from './ui/button';

const initialState = {
    success: false,
    errors: [],
};

export default function SignInForm() {
    const [state, formAction, isPending] = useActionState(signUpAction, initialState);

    return (
        <section className='flex flex-col  gap-4'>
            <h1>Kontakt os</h1>
            <form action={formAction} className='flex flex-col w-full gap-4 justify-between'>
                <input
                    type='text'
                    name='name'
                    placeholder='Indtast dit navn'
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                <input
                    type='email'
                    name='email'
                    placeholder='Indtast din email'
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                <textarea
                    name='message'
                    placeholder='Skriv din besked her'
                    className='border border-secondary bg-secondary text-primary w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                />
                <Button type='submit' disabled={isPending} className='mx-8 p-4'>
                    {isPending ? 'Sender...' : 'Send besked'}
                </Button>
            </form>
        </section>
    );
}
