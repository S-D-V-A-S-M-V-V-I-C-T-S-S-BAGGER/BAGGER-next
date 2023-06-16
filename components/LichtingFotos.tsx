import {FC} from 'react';
import path from 'path';
import fs from 'fs';
import Image from 'next/image';

const LichtingFotos: FC = () => {
    const lichtingFotoDir = 'lichtingfotos';
    const dir             = path.resolve('./public', lichtingFotoDir);
    const lichtingFotos   = fs.readdirSync(dir);

    const components = [];

    for (let i = 0; i < lichtingFotos.length; i++) {
        const lichtingFoto = lichtingFotos[i];

        if (lichtingFoto === '.gitkeep') {
            continue;
        }

        const imagePath = path.join('/', lichtingFotoDir, lichtingFoto);

        const links = i % 2 == 0;

        components.push((
            <div key={i} className={'lichting-balk'}>
                <div className={`lichting-afbeelding-bubbel lichting-afbeelding-${links ? 'links' : 'rechts'}`}>
                    <Image className={'lichting-afbeelding'} src={imagePath} height={1024} width={1024} alt={'Lichting foto'}/>
                </div>
            </div>
        ));
    }

    return <> {components} </>;
};

export default LichtingFotos;
