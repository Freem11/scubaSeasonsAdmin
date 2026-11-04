import { createContext } from "react";
import { PartnerRequest } from '../../shared/entities/partnerRequest';

type SelectedPartnerRequestContextType = {
  selectedPartnerRequest: PartnerRequest | null;
  setSelectedPartnerRequest: React.Dispatch<React.SetStateAction<PartnerRequest | null>>;
};

export const SelectedPartnerRequestContext = createContext<SelectedPartnerRequestContextType>({} as SelectedPartnerRequestContextType);
