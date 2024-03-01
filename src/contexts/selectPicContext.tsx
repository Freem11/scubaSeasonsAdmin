import { createContext } from "react";

type SelectedPicContextType = {
  selectedPic: string | null;
  setSelectedPic: React.Dispatch<React.SetStateAction<string | null>>;
};

const SelectedPicContextState = {
  selectedPic: null,
  setSelectedPic: () => {},
};

const SelectedPicContext = createContext<SelectedPicContextType>(
  SelectedPicContextState
);

export default SelectedPicContext;
