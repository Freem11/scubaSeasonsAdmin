import { createContext } from "react";
import { DiveSite } from "../../shared/entities/diveSite";

type PendingDiveSitesContextType = {
  pendingDiveSites: DiveSite[] | null;
  setPendingDiveSites: React.Dispatch<React.SetStateAction<DiveSite[] | null>>;
};

export const PendingDiveSitesContext = createContext<PendingDiveSitesContextType>({} as PendingDiveSitesContextType);
