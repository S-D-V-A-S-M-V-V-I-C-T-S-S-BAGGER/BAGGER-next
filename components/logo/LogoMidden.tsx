'use client';

import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useState} from 'react';
import './logo.css';
import BubblesTest, {BubbleDef} from '@/components/BubblesTest';

export const HoleContext = createContext<{
    holes: (BubbleDef | null)[],
    initHoles: Dispatch<SetStateAction<(BubbleDef | null)[]>> | null,
    setHole: (index: number, hole: BubbleDef) => void,
}>({
    holes: [],
    initHoles: null,
    setHole: (index, hole) => {},
});

const LogoMidden: FC<PropsWithChildren> = ({children}) => {
    const [holes, setHoles] = useState<(BubbleDef | null)[]>([]);
    return (
        <div className="content">
            <HoleContext.Provider value={{
                holes,
                initHoles: setHoles,
                setHole: (index, hole) => {
                    const newHoles = holes;
                    newHoles[index] = hole;
                    setHoles(newHoles);
                },
            }}>
            <div className="content-achter">
                <BubblesTest/>
                <div className="bier-tunnel"/>
                <BubblesTest/>
            </div>
            <div className="content-voor">
                {children}
            </div>
            </HoleContext.Provider>
        </div>
    );
};

export default LogoMidden;
