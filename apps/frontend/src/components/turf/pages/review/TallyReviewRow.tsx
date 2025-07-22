import { FC } from "react";
import "./review.css";
import { formatEuros } from "../../../../lib/euroUtil.ts";
import { TallyEntry } from "../TallyList.tsx";

type TallyReviewRowProps = {
  entry: TallyEntry;
};

const TallyReviewRow: FC<TallyReviewRowProps> = ({ entry }) => {
  return (
    <div className="review-row">
      <div>{entry.name}</div>
      <div>€{formatEuros(entry.price / 100)}</div>
      <div>{entry.amount}</div>
    </div>
  );
};

export default TallyReviewRow;
