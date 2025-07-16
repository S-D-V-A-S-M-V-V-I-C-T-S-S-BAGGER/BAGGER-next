import { FC } from "react";
import "./sitemap.css";
import AuthButton from "../auth/AuthButton.tsx";
import { Link } from "@tanstack/react-router";

const SiteMap: FC = () => {
  return (
    <div>
      <div className="auth">
        <AuthButton />
      </div>
      <div className={"section"}>
        <p className={"title"}>Links</p>
        <p>
          <Link to={"/"}>Home/Smoelenboek</Link>
        </p>
        <p>
          <a href={"/turf"}>Turflijst</a>
        </p>
        <p>
          <Link to={"/quotes"}>Quotes</Link>
        </p>
        <p>
          <a href={"/declaratie"}>Declaratie indienen</a>
        </p>
        <p>
          <a href={"/planning"}>Activiteiten planning</a>
        </p>
        <p>
          <Link to={"/sitemap"}>Hier</Link>
        </p>
      </div>
      <div className={"section"}>
        <p className={"title"}>API</p>
        <p>
          <a href={"/api/v0/week"}>week</a> Geeft het huidige weeknummer.
        </p>
        <p>
          <a href={"/api/v0/bak"}>bak</a> Bak of geen bak?
        </p>
        <p>
          <a href={"/api/v0/bafko"}>bafko</a> Voor elke situatie wel één!
        </p>
      </div>
    </div>
  );
};

export default SiteMap;
