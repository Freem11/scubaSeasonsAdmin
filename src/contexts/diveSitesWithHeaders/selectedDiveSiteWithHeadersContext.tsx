import { createContext } from "react";
import { DiveSiteWithHeader } from "../../entities/diveSiteWithHeader";

type SelectedDiveSiteWithHeadersContextType = {
  selectedDiveSiteWithHeaders: DiveSiteWithHeader | null;
  setSelectedDiveSiteWithHeaders: React.Dispatch<React.SetStateAction<DiveSiteWithHeader | null>>;
};

export const SelectedDiveSiteWithHeadersContext = createContext<SelectedDiveSiteWithHeadersContextType>({} as SelectedDiveSiteWithHeadersContextType);
