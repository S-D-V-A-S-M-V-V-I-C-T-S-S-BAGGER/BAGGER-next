import {
  createContext,
  FC,
  PropsWithChildren,
  RefObject,
  useState,
} from "react";
import LogoBovenkant from "./LogoBovenkant";
import LogoMidden from "./LogoMidden";
import LogoOnderkant from "./LogoOnderkant";
import { getEnv } from "../../lib/environment.ts";

export type HoleRef = RefObject<HTMLDivElement>;

export const HoleContext = createContext<{
  holeRefs: (HoleRef | null)[];
  setHoleRef: (index: number, holeRef: HoleRef | null) => void;
}>({
  holeRefs: [],
  setHoleRef: (_index, _holeRef) => {},
});

const Logo: FC<PropsWithChildren> = ({ children }) => {
  const lichtingFotos = getEnv().VITE_LICHTING_IMAGES.split(",");

  const emptyHoles = [];
  for (let i = 0; i < 1 + lichtingFotos.length; i++) {
    emptyHoles.push(null);
  }
  const [holeRefs, setHoleRefs] = useState<(HoleRef | null)[]>(emptyHoles);

  return (
    <HoleContext.Provider
      value={{
        holeRefs,
        setHoleRef: (index, holeRef) => {
          setHoleRefs((prevState) => {
            prevState[index] = holeRef;
            return prevState;
          });
        },
      }}
    >
      <LogoBovenkant />
      <LogoMidden>{children}</LogoMidden>
      <LogoOnderkant />
    </HoleContext.Provider>
  );
};

export default Logo;
