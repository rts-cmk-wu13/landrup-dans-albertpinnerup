'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    console.log(error);

    return (
        <main className='p-4 flex flex-col gap-4 mt-12 items-center justify-center'>
            <h1>Something went wrong!</h1>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Please try again
            </Button>
        </main>
    );
}
