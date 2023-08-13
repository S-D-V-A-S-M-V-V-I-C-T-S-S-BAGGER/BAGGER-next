import { FC, MouseEventHandler, PropsWithChildren } from "react";
import './baggerButton.css'

type BaggerButtonProps = {
	onClick: MouseEventHandler<HTMLButtonElement>;
}

const BaggerButton: FC<PropsWithChildren<BaggerButtonProps>> = ({children, onClick}) => {
	return (
		<button className="baggerButton" onClick={onClick}>{ children }</button>
	)
}

export default BaggerButton;
