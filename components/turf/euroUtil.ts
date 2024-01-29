import {RefObject} from 'react';

export function parseEuros(ref: RefObject<HTMLInputElement>): number {
    return parseFloat(ref.current?.value.replaceAll(',', '.') ?? '');
}

export function parseCents(ref: RefObject<HTMLInputElement>): number {
    return ref.current ? Math.round(parseEuros(ref) * 100) : 0;
}

export function formatEuros(number: number) {
    return number.toFixed(2).replace('.', ',');
}
