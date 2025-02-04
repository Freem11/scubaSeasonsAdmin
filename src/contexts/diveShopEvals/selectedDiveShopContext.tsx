import { createContext } from "react";
import { DiveShop } from "../../entities/diveShop";

type SelectedPendingDiveShopContextType = {
  selectedPendingDiveShop: DiveShop | null;
  setSelectedPendingDiveShop: React.Dispatch<React.SetStateAction<DiveShop | null>>;
};

export const SelectedPendingDiveShopContext = createContext<SelectedPendingDiveShopContextType>({} as SelectedPendingDiveShopContextType);
