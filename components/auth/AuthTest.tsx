"use server";

import {FC} from "react";
import {getQuotes} from "@/lib/AuthApiTest";

const AuthTest: FC = async () => {
    try {
        const quotes = await getQuotes();

        if (!quotes) {
            return <div>Unauthorised</div>;
        }

        return <div>{JSON.stringify(quotes)}</div>;
    } catch (err) {
        console.error(err);
        return <div>Error</div>;
    }

};

export default AuthTest;
