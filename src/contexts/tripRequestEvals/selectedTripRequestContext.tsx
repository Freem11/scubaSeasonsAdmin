import { createContext } from "react";
import { TripRequest } from '../../entities/tripRequest';

type SelectedTripRequestsContextType = {
  selectedTripRequests: TripRequest[] | null;
  setSelectedTripRequests: React.Dispatch<React.SetStateAction<TripRequest[] | null>>;
};

export const TripRequestsContext = createContext<SelectedTripRequestsContextType>({} as SelectedTripRequestsContextType);