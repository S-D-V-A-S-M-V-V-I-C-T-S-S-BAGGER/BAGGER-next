'use server';
import {FC, PropsWithChildren} from 'react';
import LichtingFotosContextProvider from '@/components/lichting_foto_data/LichtingFotosContextProvider';

const LichtingFotosContextLoader: FC<PropsWithChildren> = ({children}) => {
    const lichtingFotoDir = process.env.LICHTING_FOTO_PREFIX ?? '';
    const lichtingFotos = process.env.LICHTING_FOTO_LIST?.split(',') ?? [];
    return (
        <LichtingFotosContextProvider lichtingFotoDir={lichtingFotoDir} lichtingFotos={lichtingFotos}>
            {children}
        </LichtingFotosContextProvider>
    );
};

export default LichtingFotosContextLoader;
