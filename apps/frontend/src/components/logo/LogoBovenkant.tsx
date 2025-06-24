import { FC } from "react";
import "./logo.css";

const LogoBovenkant: FC = () => {
  return (
    <div className="logo-bovenkant">
      <div className="lucht">
        <div className="blaadjes">
          <img
            className="blaadjes-afbeelding"
            src={"public/blaadjes-optimized.svg"}
            alt="Two leafs joined at the stem"
          />
          <div className="blaadjes-steeltje" />
        </div>
        <div className="steel">
          <div className="steel-onder" />
        </div>
        <div className="bagger-tekst">Bagger</div>
      </div>
      <div className="aarde-bovenkant">
        <div className="aarde-bovenkant-vruchtbaar" />
      </div>
      <div className="bier-tunnel-boven" />
    </div>
  );
};

export default LogoBovenkant;
