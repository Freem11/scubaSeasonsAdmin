import { createContext } from "react";
import { DiveSite } from "../../entities/diveSite";

type SelectedPendingDiveSiteContextType = {
  selectedPendingDiveSite: DiveSite | null;
  setSelectedPendingDiveSite: React.Dispatch<React.SetStateAction<DiveSite | null>>;
};

export const SelectedPendingDiveSiteContext = createContext<SelectedPendingDiveSiteContextType>({} as SelectedPendingDiveSiteContextType);
