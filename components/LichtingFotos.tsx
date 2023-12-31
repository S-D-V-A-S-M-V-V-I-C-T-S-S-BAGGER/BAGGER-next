'use client';

import {FC, useContext} from 'react';
import './lichtingfotos.css';
import LichtingBubbel from '@/components/LichtingBubbel';
import {HoleContext} from '@/components/logo/Logo';
import LichtingFotosContext from '@/components/lichting_foto_data/LichtingFotosContext';

const LichtingFotos: FC = () => {
    const {setHoleRef} = useContext(HoleContext);
    const {lichtingFotoDir, lichtingFotos} = useContext(LichtingFotosContext);

    const components = [];

    for (let i = 0; i < lichtingFotos.length; i++) {
        const lichtingFoto = lichtingFotos[i];

        const imagePath = `/${lichtingFotoDir}/${lichtingFoto}`;

        const links = i % 2 == 0;

        components.push((
            <div key={i} className={'lichting-balk'}>
                <LichtingBubbel links={links} imagePath={imagePath} positionCallback={(ref) => setHoleRef(i + 1, ref)}/>
            </div>
        ));
    }

    return <> {components} </>;
};

export default LichtingFotos;
