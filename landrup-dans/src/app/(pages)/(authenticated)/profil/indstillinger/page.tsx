'use client';
import { Button } from '@/components/ui/button';
import { logOutAction } from '@/lib/actions/authActions';
import { useState, useTransition } from 'react';
import { createPortal } from 'react-dom';

export default function settingsPage() {
    const [showModal, setShowModal] = useState(false);
    const [_, startTransition] = useTransition();

    return (
        <section className='flex flex-col gap-4 px-4 py-8'>
            <h3 className='font-medium'>Indstillinger</h3>
            <p>Her kan du ændre dine indstillinger.</p>
            <Button onClick={() => setShowModal(true)}>Log ud</Button>
            {showModal &&
                createPortal(
                    <div className='h-screen w-screen fixed top-0 left-0 bg-black/50 flex items-center justify-center z-50'>
                        <div className='bg-secondary p-6 rounded-lg flex flex-col items-center gap-4'>
                            <h4 className='text-primary font-medium'>
                                Er du sikker på, at du vil logge ud?
                            </h4>
                            <div className='flex gap-4'>
                                <Button
                                    variant='outline'
                                    className='text-primary'
                                    onClick={() => setShowModal(false)}
                                >
                                    Annuller
                                </Button>
                                <Button
                                    variant='destructive'
                                    onClick={() => startTransition(() => logOutAction())}
                                >
                                    Log ud
                                </Button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </section>
    );
}
