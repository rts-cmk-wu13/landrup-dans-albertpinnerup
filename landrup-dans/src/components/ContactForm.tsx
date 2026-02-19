'use client';

import contactAction, { ContactState } from '@/lib/actions/contactAction';
import { useActionState } from 'react';
import { Button } from './ui/button';

const initialState: ContactState = {
    success: false,
    errors: [],
};

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState(contactAction, initialState);

    return (
        <section className='flex flex-col  gap-4'>
            <h1>Kontakt os</h1>
            <p>Har du spørgsmål eller ønsker at booke en dansetime? Kontakt os i dag!</p>
            <form action={formAction} className='flex flex-col w-full gap-4 justify-between'>
                {state.errors && state.errors.length > 0 && (
                    <div className='bg-red-100 text-red-700 p-2 rounded-md'>
                        {state.errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
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
