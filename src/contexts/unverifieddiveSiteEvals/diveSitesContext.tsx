import { createContext } from "react";
import { DiveSite } from "../../entities/diveSite";

type UnverifiedDiveSitesContextType = {
  unverifiedDiveSites: DiveSite[] | null;
  setUnverifiedDiveSites: React.Dispatch<React.SetStateAction<DiveSite[] | null>>;
};

export const UnverifiedDiveSitesContext = createContext<UnverifiedDiveSitesContextType>({} as UnverifiedDiveSitesContextType);
