'use client';
import {FC, PropsWithChildren} from 'react';
import LichtingFotosContext from '@/components/lichting_foto_data/LichtingFotosContext';

type LichtingFotosContextProviderProps = {
    lichtingFotoDir: string,
    lichtingFotos: string[],
}

const LichtingFotosContextProvider: FC<PropsWithChildren<LichtingFotosContextProviderProps>> = ({children, lichtingFotoDir, lichtingFotos}) => {
    return (
        <LichtingFotosContext.Provider value={{
            lichtingFotoDir,
            lichtingFotos,
        }}>
            {children}
        </LichtingFotosContext.Provider>
    );
};

export default LichtingFotosContextProvider;
