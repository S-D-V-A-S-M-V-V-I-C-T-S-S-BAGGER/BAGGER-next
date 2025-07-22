import { FC, useContext } from "react";
import "../turf.css";
import "../../../styling/baggerButton.css";
import "../../../styling/roundNeoButton.css";
import { AuthContext } from "../../auth/AuthContext.ts";
import LogoutButton from "../../auth/LogoutButton.tsx";
import LoginButton from "../../auth/LoginButton.tsx";
import FaCoins from "../FontAwesome/FaCoins.tsx";
import FaListOl from "../FontAwesome/FaListOl.tsx";

type TallyCreationProps = {
  startTally: () => void;
  enterAmount: () => void;
};

const TallyCreation: FC<TallyCreationProps> = ({ startTally, enterAmount }) => {
  const { isAuthenticated, userName } = useContext(AuthContext);

  return (
    <main className="tallyCreationMain">
      {isAuthenticated && (
        <div className="logout">
          <LogoutButton />
        </div>
      )}
      <div className="rowFlex gap1rem center">
        {isAuthenticated ? (
          <h3 className="rowFlex">Hallo {userName}!</h3>
        ) : (
          <LoginButton />
        )}
      </div>
      <div className="buttonContainer">
        <button
          className="baggerButton"
          onClick={() => {
            enterAmount();
          }}
        >
          <div className="cardButtonContent">
            <span className="buttonIconBig">
              <FaCoins />
            </span>
            <h5>Eindbedrag invoeren</h5>
            <p>Tel het zelf op</p>
          </div>
        </button>
        <button
          className="baggerButton"
          onClick={() => {
            startTally();
          }}
        >
          <div className="cardButtonContent">
            <span className="buttonIconBig">
              <FaListOl />
            </span>
            <h5>Turven</h5>
            <p>Laat het voor je doen</p>
          </div>
        </button>
      </div>
    </main>
  );
};

export default TallyCreation;
