'use client';

import {FC, useContext, useEffect} from 'react';
import path from 'path';
import './lichtingfotos.css';
import LichtingBubbel from '@/components/LichtingBubbel';
import {BubbleDef} from '@/components/BubblesTest';
import {HoleContext} from '@/components/logo/LogoMidden';

type LichtingFotosProps = {
    lichtingFotoDir: string,
    lichtingFotos: string[],
}

const LichtingFotos: FC<LichtingFotosProps> = ({lichtingFotos, lichtingFotoDir}) => {
    const bubbelPositions: (BubbleDef | null)[] = lichtingFotos.map(() => null);

    const {holes, initHoles, setHole} = useContext(HoleContext);

    useEffect(() => {
        if (initHoles && holes.length != bubbelPositions.length) {
            initHoles(bubbelPositions);
        }
    }, []);

    const components = [];

    for (let i = 0; i < lichtingFotos.length; i++) {
        const lichtingFoto = lichtingFotos[i];

        const imagePath = path.join('/', lichtingFotoDir, lichtingFoto).replaceAll('\\', '/');

        const links = i % 2 == 0;

        // TODO use callback hook?

        components.push((
            <div key={i} className={'lichting-balk'}>
                <LichtingBubbel links={links} imagePath={imagePath} positionCallback={(position) => setHole(i, position)}/>
            </div>
        ));
    }

    return <> {components} </>;
};

export default LichtingFotos;
