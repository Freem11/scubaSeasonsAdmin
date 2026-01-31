import { createContext } from "react";
import { Species } from "../../entities/species";

type SeaLifeHeadersContextType = {
  headerlessSpecies: Species[] | null;
  setHeaderlessSpecies: React.Dispatch<React.SetStateAction<Species[] | null>>;
};

export const SeaLifeHeadersContext = createContext<SeaLifeHeadersContextType>({} as SeaLifeHeadersContextType);
