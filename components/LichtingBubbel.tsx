'use client'

import {FC, useEffect, useRef} from 'react';
import Image from 'next/image';
import {HoleRef} from '@/components/logo/Logo';

type LichtingBubbelProps = {
    links: boolean,
    imagePath: string,
    positionCallback: (position: HoleRef) => void,
}

const LichtingBubbel: FC<LichtingBubbelProps> = ({links, imagePath, positionCallback}) => {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        positionCallback(ref);
    }, [])

    return (
        <div ref={ref} className={`lichting-afbeelding-bubbel lichting-afbeelding-${links ? 'links' : 'rechts'}`}>
            <Image className={'lichting-afbeelding'} src={imagePath} height={1024} width={1024} alt={'Lichting foto'}/>
        </div>
    )
}

export default LichtingBubbel;
