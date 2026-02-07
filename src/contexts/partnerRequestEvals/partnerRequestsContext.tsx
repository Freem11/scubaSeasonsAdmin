import { createContext } from "react";
import { PartnerRequest } from '../../entities/partnerRequest';

type PartnerRequestsContextType = {
  partnerRequests: PartnerRequest[] | null;
  setPartnerRequests: React.Dispatch<React.SetStateAction<PartnerRequest[] | null>>;
};

export const PartnerRequestsContext = createContext<PartnerRequestsContextType>({} as PartnerRequestsContextType);
