import {FC} from 'react';
import Image from 'next/image';
import Blaadjes from '@/public/blaadjes-optimized.svg';
import './logo.css'

const LogoBovenkant: FC = () => {
    return (
        <div className="logo-bovenkant">
            <div className="lucht">
                <div className="blaadjes">
                    <Image
                        className="blaadjes-afbeelding"
                        src={Blaadjes}
                        alt="Two leafs joined at the stem"
                        priority
                    />
                    <div className="blaadjes-steeltje"/>
                </div>
                <div className="steel">
                    <div className="steel-onder"/>
                </div>
                <div className="bagger-tekst">Bagger</div>
            </div>
            <div className="aarde-bovenkant">
                <div className="aarde-bovenkant-vruchtbaar"/>
            </div>
            <div className="bier-tunnel-boven"/>
        </div>
    );
};

export default LogoBovenkant;
