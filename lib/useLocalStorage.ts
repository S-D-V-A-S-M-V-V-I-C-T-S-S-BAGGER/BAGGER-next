'use client';
import {useEffect, useState} from 'react';

export function useLocalStorage<T>(key: string, fallbackValue: T) {
    const stored = localStorage.getItem(key);
    const [value, setValue] = useState<T>(stored ? JSON.parse(stored) : fallbackValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}
