import {FC} from 'react';
import path from 'path';
import fs from 'fs';
import './lichtingfotos.css'
import LichtingFotos from '@/components/LichtingFotos';

const LichtingFotosLoader: FC = () => {
    // TODO memoize or hardcode?
    const lichtingFotoDir = 'lichtingfotos';
    const dir             = path.resolve('./public', lichtingFotoDir);
    const lichtingFotos   = fs.readdirSync(dir).filter(fileName => fileName !== '.gitkeep');

    return <LichtingFotos lichtingFotos={lichtingFotos} lichtingFotoDir={lichtingFotoDir}/>
};

export default LichtingFotosLoader;
