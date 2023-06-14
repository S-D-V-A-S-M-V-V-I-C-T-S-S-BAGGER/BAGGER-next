import {FC} from 'react';
import Image from 'next/image';
import Grolschje from '@/public/grolschje-optimized.svg';

const LogoOnderkant: FC = () => {
    return (
        <div className="logo-onderkant">
            <div className="bier-tunnel-onder"/>
            <div className="bier-gat">
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
