import { createContext } from "react";
import { DiveSite } from "../../shared/entities/diveSite";

type SelectedUnverifiedDiveSiteContextType = {
  selectedUnverifiedDiveSite: DiveSite | null;
  setSelectedUnverifiedDiveSite: React.Dispatch<React.SetStateAction<DiveSite | null>>;
};

export const SelectedUnverifiedDiveSiteContext = createContext<SelectedUnverifiedDiveSiteContextType>({} as SelectedUnverifiedDiveSiteContextType);
