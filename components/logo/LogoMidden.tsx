import {FC, PropsWithChildren} from 'react';
import './logo.css'

const LogoMidden: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className="content">
            <div className="content-achter">
                <div className="bier-tunnel"/>
            </div>
            <div className="content-voor">
                {children}
            </div>
        </div>
    );
};

export default LogoMidden;
