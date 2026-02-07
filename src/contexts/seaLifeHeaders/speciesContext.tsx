import { createContext } from "react";

type SpeciesContextType = {
  species: string | null;
  setSpecies: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SpeciesContext = createContext<SpeciesContextType>({} as SpeciesContextType);
