import { createContext } from "react";
import { DiveSite } from "../../entities/diveSite";

type SelectedUnverifiedDiveSiteContextType = {
  selectedUnverifiedDiveSite: DiveSite | null;
  setSelectedUnverifiedDiveSite: React.Dispatch<React.SetStateAction<DiveSite | null>>;
};

export const SelectedUnverifiedDiveSiteContext = createContext<SelectedUnverifiedDiveSiteContextType>({} as SelectedUnverifiedDiveSiteContextType);
