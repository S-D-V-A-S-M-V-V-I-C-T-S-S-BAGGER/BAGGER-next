'use client';

import {FC, PropsWithChildren} from 'react';
import './logo.css';
import BubblesTest from '@/components/BubblesTest';

const LogoMidden: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="content">

            <div className="content-achter">
                <BubblesTest seed={1}/>
                <div className="bier-tunnel"/>
                <BubblesTest seed={2}/>
            </div>
            <div className="content-voor">
                {children}
            </div>
        </div>
    );
};

export default LogoMidden;
