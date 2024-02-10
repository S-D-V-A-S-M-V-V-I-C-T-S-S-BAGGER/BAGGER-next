import { FC, MouseEventHandler, PropsWithChildren } from "react";
import './roundNeoButton.css';

type RoundNeoButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const RoundNeoButton: FC<PropsWithChildren<RoundNeoButtonProps>> = ({children, onClick}) => {
    return (
        <button className="roundNeoButton" onClick={onClick}>{ children }</button>
    );
};

export default RoundNeoButton;