import { FC, useContext } from "react";
import "./lichtingfotos.css";
import LichtingBubbel from "./LichtingBubbel";
import { HoleContext } from "./Logo";
import { getEnv } from "../../lib/environment.ts";

const LichtingFotos: FC = () => {
  const { setHoleRef } = useContext(HoleContext);

  const lichtingFotoDir = getEnv().VITE_LICHTING_IMAGES_PATH;
  const lichtingFotos = getEnv().VITE_LICHTING_IMAGES.split(",");

  const components = [];

  for (let i = 0; i < lichtingFotos.length; i++) {
    const lichtingFoto = lichtingFotos[i];

    const imagePath = `/${lichtingFotoDir}/${lichtingFoto}`;

    const links = i % 2 == 0;

    components.push(
      <div key={i} className={"lichting-balk"}>
        <LichtingBubbel
          links={links}
          imagePath={imagePath}
          positionCallback={(ref) => setHoleRef(i + 1, ref)}
        />
      </div>,
    );
  }

  return <> {components} </>;
};

export default LichtingFotos;
