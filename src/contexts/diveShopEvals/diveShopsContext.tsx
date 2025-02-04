import { createContext } from "react";
import { DiveShop } from "../../entities/diveShop";

type PendingDiveShopsContextType = {
  pendingDiveShops: DiveShop[] | null;
  setPendingDiveShops: React.Dispatch<React.SetStateAction<DiveShop[] | null>>;
};

export const PendingDiveShopsContext = createContext<PendingDiveShopsContextType>({} as PendingDiveShopsContextType);
