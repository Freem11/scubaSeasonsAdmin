import { createContext } from "react";
import { DiveSite } from "../entities/diveSite";

type DiveSitesContextType = {
  diveSites: DiveSite[] | null;
  setDiveSites: React.Dispatch<React.SetStateAction<DiveSite[] | null>>;
};

export const DiveSitesContext = createContext<DiveSitesContextType>({} as DiveSitesContextType);
