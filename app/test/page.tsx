import {FC} from "react";
import './testpage.css';
import AuthTest from "@/components/auth/AuthTest";
import AuthButton from "@/components/auth/AuthButton";
import AuthContextLoader from "@/components/auth/AuthContextLoader";

const Index: FC = () => {
    return (
        <AuthContextLoader>
        <div>
            <AuthButton/>
            <AuthTest/>
        </div>
        </AuthContextLoader>
    );
};

export default Index;
