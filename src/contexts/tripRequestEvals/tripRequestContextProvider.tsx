import { createContext } from "react";
import { TripRequest } from '../../entities/tripRequest';

type TripRequestsContextType = {
  tripRequests: TripRequest[] | null;
  setPartnerRequests: React.Dispatch<React.SetStateAction<TripRequest[] | null>>;
};

export const PartnerRequestsContext = createContext<TripRequestsContextType>({} as TripRequestsContextType);