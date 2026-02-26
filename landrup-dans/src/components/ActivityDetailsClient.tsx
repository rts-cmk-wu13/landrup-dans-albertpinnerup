'use client';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import toggleActivityParticipation from '@/lib/actions/activityActions';
import { ActivityType } from '@/lib/types/types';
import Image from 'next/image';
import { useOptimistic, useState, useTransition } from 'react';

export default function ActivityDetailsClient({
    activity,
    activityId,
    initialJoinedState,
    age,
    role,
}: {
    activity: ActivityType;
    activityId: ActivityType['id'];
    initialJoinedState: boolean;
    age: number;
    role: string;
}) {
    const [joined, setJoined] = useState(initialJoinedState);

    const [isPending, startTransition] = useTransition();

    const disabled =
        isPending ||
        age < activity.minAge ||
        age > activity.maxAge ||
        role === 'instructor' ||
        (activity.maxParticipants === activity.users?.length && !joined);

    const onToggle = () => {
        const nextJoined = !joined;

        startTransition(async () => {
            setJoined(nextJoined);

            const res = await toggleActivityParticipation({ activityId, join: nextJoined });
            if (res.ok) {
                setJoined(nextJoined);
            }
        });
    };

    return (
        <main>
            <div className='relative flex flex-col p-7 items-end justify-end aspect-4/5'>
                <Button
                    className='z-50 text-lg font-normal px-8 py-4'
                    variant={'secondary'}
                    disabled={disabled}
                    onClick={onToggle}
                >
                    {joined ? 'Forlad aktivitet' : 'Tilmeld'}
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
