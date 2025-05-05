import { createContext } from "react";
import { SeaLifePhoto } from "../../entities/seaLifePhoto";

type SeaLifePhotosContextType = {
  photoRecords: SeaLifePhoto[] | null;
  setPhotoRecords: React.Dispatch<React.SetStateAction<SeaLifePhoto[] | null>>;
};

export const SeaLifePhotosContext = createContext<SeaLifePhotosContextType>({} as SeaLifePhotosContextType);
