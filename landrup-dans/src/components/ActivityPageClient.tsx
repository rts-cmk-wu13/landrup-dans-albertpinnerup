'use client';

import ActivityCard from './ActivityCard';
import { ActivityType } from '@/lib/types/types';
import { useState } from 'react';
import SearchBar from './SearchBar';

export default function ActivityPageClient({ activities }: { activities: ActivityType[] }) {
    const [query, setQuery] = useState('');

    const q = query.trim().toLowerCase();

    const filteredActivities = query
        ? activities.filter(
              (activity) =>
                  activity.name.toLowerCase().includes(q) ||
                  activity.weekday.toLowerCase().includes(q)
          )
        : activities;

    return (
        <>
            <SearchBar query={query} setQueryAction={setQuery} />
            <h1 className='mb-4'>Aktiviteter</h1>

            <div className='flex flex-col gap-6'>
                {filteredActivities.map((activity: any) => {
                    return (
                        <ActivityCard
                            key={activity.id}
                            imgUrl={activity.asset.url}
                            name={activity.name}
                            minAge={activity.minAge}
                            maxAge={activity.maxAge}
                            id={activity.id}
                        />
                    );
                })}
            </div>
        </>
    );
}
