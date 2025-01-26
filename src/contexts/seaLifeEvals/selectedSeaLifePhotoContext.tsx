import { createContext } from "react";
import { SeaLifePhoto } from "../../entities/seaLifePhoto";

type SelectedSeaLifeContextType = {
  selectedSeaLife: SeaLifePhoto | null;
  setSelectedSeaLife: React.Dispatch<React.SetStateAction<SeaLifePhoto | null>>;
};

export const SelectedSeaLifeContext = createContext<SelectedSeaLifeContextType>({} as SelectedSeaLifeContextType);
