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
    return (
        <div className='tallyCount'>
            <button className='tallyButton' onClick={() => onChangeButton(-1)}>-</button>
            <input
                ref={countRef}
                type="number"
                min={0}
                step={1}
                defaultValue={amount}
                className="tallyInput"
                onChange={onCountChanged}
            />
            <button className='tallyButton' onClick={() => onChangeButton(+1)}>+</button>
        </div>
    );
};

export default TallyCounter;
