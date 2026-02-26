'use client';

import { SearchIcon } from 'lucide-react';

type Props = {
    query: string;
    setQueryAction: (value: string) => void;
};

export default function SearchBar({ query, setQueryAction }: Props) {
    return (
        <div className='flex items-center gap-2 my-2 rounded-md justify-between py-2'>
            <input
                type='search'
                name='search'
                id='search'
                value={query}
                onChange={(e) => setQueryAction(e.target.value)}
                className='p-2 w-full  focus:bg-secondary/80 focus:outline-none rounded-md text-primary'
            />
            <label htmlFor='search' className='text-white'>
                <SearchIcon size={24} aria-hidden='true' />
            </label>
        </div>
    );
}
