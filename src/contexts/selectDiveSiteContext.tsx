import { createContext } from "react";
import { DiveSite } from "../entities/diveSite";

type SelectedDiveSiteContextType = {
  selectedDiveSite: DiveSite | null;
  setSelectedDiveSite: React.Dispatch<React.SetStateAction<DiveSite | null>>;
};

export const SelectedDiveSiteContext = createContext<SelectedDiveSiteContextType>({} as SelectedDiveSiteContextType);
