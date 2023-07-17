'use client'

import {FC, useEffect, useRef} from 'react';
import Image from 'next/image';
import {BubbleDef} from '@/components/BubblesTest';

type LichtingBubbelProps = {
    links: boolean,
    imagePath: string,
    positionCallback: (position: BubbleDef) => void,
}

const LichtingBubbel: FC<LichtingBubbelProps> = ({links, imagePath, positionCallback}) => {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const boundingClientRect = ref.current!.getBoundingClientRect();
        const circle: BubbleDef  = {
            x: boundingClientRect.right - (boundingClientRect.width / 2),
            y: boundingClientRect.bottom - (boundingClientRect.height / 2),
            radius: boundingClientRect.width / 2,
        }
        positionCallback(circle);
    }, [])

    return (
        <div ref={ref} className={`lichting-afbeelding-bubbel lichting-afbeelding-${links ? 'links' : 'rechts'}`}>
            <Image className={'lichting-afbeelding'} src={imagePath} height={1024} width={1024} alt={'Lichting foto'}/>
        </div>
    )
}

export default LichtingBubbel;
