import {FC} from "react";
import {TallyEntry} from "@/components/turf/pages/TallyList";
import './review.css';
import {formatEuros} from "@/components/turf/euroUtil";

type TallyReviewRowProps = {
    entry: TallyEntry,
}

const TallyReviewRow: FC<TallyReviewRowProps> = ({entry}) => {
    return (
        <div className='review-row'>
            <div>{entry.name}</div>
            <div>€{formatEuros(entry.price/100)}</div>
            <div>{entry.amount}</div>
        </div>
    );
};

export default TallyReviewRow;
