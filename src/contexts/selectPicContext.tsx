import { createContext } from "react";

type SelectedPicContextType = {
  selectedPic: string | null;
  setSelectedPic: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SelectedPicContext = createContext<SelectedPicContextType>({} as SelectedPicContextType);
