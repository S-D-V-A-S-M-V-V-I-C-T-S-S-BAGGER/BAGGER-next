'use client';
import {FC, PropsWithChildren} from 'react';
import './logo.css';
import BackgroundBubbles from '@/components/BackgroundBubbles';

const LogoMidden: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="content">
            <div className="content-achter">
                <BackgroundBubbles seed={1}/>
                <div className="bier-tunnel"/>
                <BackgroundBubbles seed={2}/>
            </div>
            <div className="content-voor">
                {children}
            </div>
        </div>
    );
};

export default LogoMidden;
