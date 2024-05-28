"use server";

import {FC} from "react";
import {getQuotes} from "@/lib/AuthApiTest";
import {getSessionName} from "@/lib/session";

const AuthTest: FC = async () => {
    const name = await getSessionName() ?? "gast";

    let content;

    try {
        const quotes = await getQuotes();

        if (!quotes) {
            content = <div>Unauthorised</div>;
        } else {
            content = <div>{JSON.stringify(quotes)}</div>;
        }
    } catch (err) {
        console.error(err);
        content = <div>Error</div>;
    }
    return (
        <div>
            Hallo {name}!
            {content}
        </div>
    );
};

export default AuthTest;
