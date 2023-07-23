'use client';
import {FC, useContext, useEffect, useRef} from 'react';
import Image from 'next/image';
import Grolschje from '@/public/grolschje-optimized.svg';
import './logo.css';
import {HoleContext} from '@/components/logo/Logo';

const LogoOnderkant: FC = () => {
    const {setHoleRef} = useContext(HoleContext);
    const bierGatRef   = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHoleRef(0, bierGatRef);
    }, []);

    return (
        <div className="logo-onderkant">
            <div className="bier-tunnel-onder"/>
            <div ref={bierGatRef} className="bier-gat">
                <Image
                    className="biertje-afbeelding"
                    src={Grolschje}
                    alt="A Grolsch beer bottle"
                    priority
                />
            </div>
        </div>
    );
};

export default LogoOnderkant;
