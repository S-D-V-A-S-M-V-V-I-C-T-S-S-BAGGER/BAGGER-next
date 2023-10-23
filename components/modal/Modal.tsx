'use client';
import {FC, PropsWithChildren} from 'react';
import './modal.css';

type ModalProps = {
    open: boolean,
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({open, children}) => {
    if (!open) {
        return null;
    }

    return (
        <>
            <div className="modalOverlay"/>
            <div className="modalBox">{children}</div>
        </>
    );
};

export default Modal;
