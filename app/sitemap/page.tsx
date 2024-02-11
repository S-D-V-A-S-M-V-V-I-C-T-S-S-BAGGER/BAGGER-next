import {FC} from "react";
import './sitemap.css';

const Index: FC = () => {
    return (
        <div>
            <div className={'section'}>
                <p className={'title'}>Links</p>
                <a href={'/'}>Home/Smoelenboek</a><br/>
                <a href={'/turf'}>Turflijst</a><br/>
                <a href={'/declaratie'}>Declaratie indienen</a><br/>
                <a href={'/planning'}>Activiteiten planning</a><br/>
                <a href={'/sitemap'}>Hier</a><br/>
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
