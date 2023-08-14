import {FC, PropsWithChildren} from 'react';
import './wackyButton.css';

const WackyButton: FC<PropsWithChildren> = ({children}) => {
    return <button className={'wackyButton'}>{children}</button>;
};

export default WackyButton;
