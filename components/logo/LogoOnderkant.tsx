'use client';
import {FC, useContext, useEffect, useRef} from 'react';
import Image from 'next/image';
import Grolschje from '@/public/grolschje-optimized.svg';
import './logo.css';
import {HoleContext} from '@/components/logo/Logo';
import {useRouter} from "next/navigation";

const LogoOnderkant: FC = () => {
    const {setHoleRef} = useContext(HoleContext);
    const bierGatRef   = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setHoleRef(0, bierGatRef);
    }, []);

    const router = useRouter();
    const routingDelay = 500; // milliseconds

    const onClick = async () => {
        // Prefetch the page
        router.prefetch('/sitemap');
        // Only actually navigate after the user has had some time to experience this wonderful button
        await new Promise(resolve => {
            setTimeout(resolve, routingDelay);
        }).then(() => {
            router.push('/sitemap');
        });
    };

    return (
        <div className="logo-onderkant">
            <div className="bier-tunnel-onder"/>
            <div ref={bierGatRef} className="bier-gat">
                <button className={'bierButton'} onClick={onClick}>
                    <Image
                        className="biertje-afbeelding"
                        src={Grolschje}
                        alt="A Grolsch beer bottle"
                        priority
                    />
                </button>
            </div>
        </div>
    );
};

export default LogoOnderkant;
