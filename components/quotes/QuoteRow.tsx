import {FC} from "react";
import "./quotes.css";
import {Dayjs} from "dayjs";

require('dayjs/locale/nl');

type QuoteRowProps = {
    name: string;
    text: string;
    date: Dayjs;
}

const QuoteRow: FC<QuoteRowProps> = ({date, name, text}) => {
    return (
        <div className="quote-block">
            <p className="quote-top">
                {date.locale("nl").format("dddd D MMMM YYYY")} - {name}
            </p>
            <p className="quote-bottom">{text}</p>
        </div>
    );
};

export default QuoteRow;
