'use client';
import {createContext} from 'react';

const LichtingFotosContext = createContext({
    lichtingFotoDir: process.env.LICHTING_FOTO_PREFIX ?? '',
    lichtingFotos: process.env.LICHTING_FOTO_LIST?.split(',') ?? [],
});

export default LichtingFotosContext;
