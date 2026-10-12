import { createContext } from "react";
import { DiveSiteWithHeader } from "../../entities/diveSiteWithHeader";

type DiveSitesWithHeadersContextType = {
  diveSitesWithHeaders: DiveSiteWithHeader[];
  setDiveSitesWithHeaders: React.Dispatch<React.SetStateAction<DiveSiteWithHeader[]>>;
};

export const DiveSitesWithHeadersContext = createContext<DiveSitesWithHeadersContextType>({} as DiveSitesWithHeadersContextType);
