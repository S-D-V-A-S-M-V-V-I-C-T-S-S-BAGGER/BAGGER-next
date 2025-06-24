import { FC, useContext, useEffect, useRef } from "react";
import "./logo.css";
import { HoleContext } from "./Logo";
import { useNavigate } from "@tanstack/react-router";

const LogoOnderkant: FC = () => {
  const { setHoleRef } = useContext(HoleContext);
  const bierGatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHoleRef(0, bierGatRef);
  }, []);

  const navigate = useNavigate();
  const routingDelay = 150; // milliseconds

  const onClick = async () => {
    // Only actually navigate after the user has had some time to experience this wonderful button
    await new Promise((resolve) => {
      setTimeout(resolve, routingDelay);
    }).then(() => {
      navigate({
        to: "/sitemap",
      });
    });
  };

  return (
    <div className="logo-onderkant">
      <div className="bier-tunnel-onder" />
      <div ref={bierGatRef} className="bier-gat">
        <button className={"bierButton"} onClick={onClick}>
          <img
            className="biertje-afbeelding"
            src={"public/grolschje-optimized.svg"}
            alt="A Grolsch beer bottle"
          />
        </button>
      </div>
    </div>
  );
};

export default LogoOnderkant;
