import {FC, RefObject} from 'react';

type TallyCounterProps = {
    countRef: RefObject<HTMLInputElement>
    amount: number
    onCountChanged: () => void,
}

const TallyCounter: FC<TallyCounterProps> = ({countRef, amount, onCountChanged}) => {
    const onChangeButton = (change: number) => {
        if (countRef.current) {
            countRef.current.value = String(Math.max(0, parseInt(countRef.current.value) + change));
            onCountChanged();
        }
    };
    const fixRounding = () => {
        if (countRef.current) {
            countRef.current.value = parseInt(countRef.current.value).toFixed(0);
        }
    };
    return (
        <div className='tallyCount'>
            <button className='tallyButton' onClick={() => onChangeButton(-1)}>-</button>
            <input
                ref={countRef}
                type="text"
                defaultValue={amount}
                className="tallyInput"
                onChange={() => {
                    fixRounding();
                    onCountChanged();
                }}
            />
            <button className='tallyButton' onClick={() => onChangeButton(+1)}>+</button>
        </div>
    );
};

export default TallyCounter;
