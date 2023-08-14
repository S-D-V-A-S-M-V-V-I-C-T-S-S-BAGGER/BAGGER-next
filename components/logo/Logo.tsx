'use client';
import {createContext, FC, PropsWithChildren, RefObject, useContext, useState} from 'react';
import LogoBovenkant from '@/components/logo/LogoBovenkant';
import LogoMidden from '@/components/logo/LogoMidden';
import LogoOnderkant from '@/components/logo/LogoOnderkant';
import LichtingFotosContext from '@/components/lichting_foto_data/LichtingFotosContext';

export type HoleRef = RefObject<HTMLDivElement>;

export const HoleContext = createContext<{
    holeRefs: (HoleRef | null)[],
    setHoleRef: (index: number, holeRef: HoleRef | null) => void,
}>({
    holeRefs: [],
    setHoleRef: (_index, _holeRef) => {},
});

const Logo: FC<PropsWithChildren> = ({children}) => {
    const {lichtingFotos} = useContext(LichtingFotosContext);

    const emptyHoles = [];
    for (let i = 0; i < 1 + lichtingFotos.length; i++) {
        emptyHoles.push(null);
    }
    const [holeRefs, setHoleRefs] = useState<(HoleRef | null)[]>(emptyHoles);

    return (
        <HoleContext.Provider value={{
            holeRefs,
            setHoleRef: (index, holeRef) => {
                setHoleRefs((prevState) => {
                    prevState[index] = holeRef;
                    return prevState;
                });
            },
        }}>
            <LogoBovenkant/>
            <LogoMidden>
                {children}
            </LogoMidden>
            <LogoOnderkant/>
        </HoleContext.Provider>
    );
};

export default Logo;
