'use client';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import toggleActivityParticipation from '@/lib/actions/activityActions';
import { ActivityType } from '@/lib/types/types';
import Image from 'next/image';
import { startTransition, useActionState } from 'react';

export default function activityDetailsClient({
    activity,
    activityId,
    initialJoinedState,
    age,
}: {
    activity: ActivityType;
    activityId: string;
    initialJoinedState: boolean;
    age: number;
}) {
    const initialState = {
        joined: initialJoinedState,
    };
    const [state, action, pending] = useActionState(toggleActivityParticipation, initialState);

    return (
        <main>
            <div className='relative flex flex-col p-7 items-end justify-end aspect-4/5'>
                <Button
                    className='z-50 text-lg font-normal px-8 py-4'
                    variant={'secondary'}
                    disabled={
                        pending ||
                        age < activity.minAge ||
                        (activity.maxParticipants === activity.users?.length && !state.joined)
                    }
                    onClick={() => startTransition(() => action(activityId))}
                >
                    {pending
                        ? state.joined
                            ? 'Forlader' + <Spinner />
                            : 'Tilmelder' + <Spinner />
                        : state.joined
                          ? 'Forlad aktivitet'
                          : 'Tilmeld'}
                </Button>

                <Image
                    src={activity?.asset?.url}
                    alt={`${activity?.name} Image`}
                    fill
                    objectFit='cover'
                />
            </div>
            <section className='p-4'>
                <h3 className='font-medium'>{activity?.name}</h3>
                <p>{activity?.description}</p>
            </section>
        </main>
    );
}
