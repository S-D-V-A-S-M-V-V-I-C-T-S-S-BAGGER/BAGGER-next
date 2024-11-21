import {FC} from "react";
import './sitemap.css';
import AuthButton from "@/components/auth/AuthButton";

const Index: FC = () => {
    return (
        <div>
            <div className="auth"><AuthButton/></div>
            <div className={'section'}>
                <p className={'title'}>Links</p>
                <p><a href={'/'}>Home/Smoelenboek</a></p>
                <p><a href={'/turf'}>Turflijst</a></p>
                <p><a href={'/quotes'}>Quotes</a></p>
                <p><a href={'/declaratie'}>Declaratie indienen</a></p>
                <p><a href={'/planning'}>Activiteiten planning</a></p>
                <p><a href={'/sitemap'}>Hier</a></p>
            </div>
            <div className={'section'}>
                <p className={'title'}>API</p>
                <p><a href={'/api/week'}>week</a> Geeft het huidige weeknummer.</p>
                <p><a href={'/api/bak'}>bak</a> Bak of geen bak?</p>
                <p><a href={'/api/bafko'}>bafko</a> Voor elke situatie wel één!</p>
            </div>
        </div>
    );
};

export default Index;
