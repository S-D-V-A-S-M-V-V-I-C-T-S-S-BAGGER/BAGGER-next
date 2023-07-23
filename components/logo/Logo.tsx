'use client';
import {createContext, FC, PropsWithChildren, RefObject, useState} from 'react';
import LogoBovenkant from '@/components/logo/LogoBovenkant';
import LogoMidden from '@/components/logo/LogoMidden';
import LogoOnderkant from '@/components/logo/LogoOnderkant';
import {lichtingFotos} from '@/lib/loadLichtingFotos';

export type HoleRef = RefObject<HTMLDivElement>;

export const HoleContext = createContext<{
    holeRefs: (HoleRef | null)[],
    setHoleRef: (index: number, holeRef: HoleRef | null) => void,
}>({
    holeRefs: [],
    setHoleRef: (index, holeRef) => {},
});

const Logo: FC<PropsWithChildren> = ({children}) => {
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
