import { createContext } from "react";
import { PartnerRequest } from '../../entities/partnerRequest';

type SelectedPartnerRequestContextType = {
  selectedPartnerRequest: PartnerRequest | null;
  setSelectedPartnerRequest: React.Dispatch<React.SetStateAction<PartnerRequest | null>>;
};

export const SelectedPartnerRequestContext = createContext<SelectedPartnerRequestContextType>({} as SelectedPartnerRequestContextType);
