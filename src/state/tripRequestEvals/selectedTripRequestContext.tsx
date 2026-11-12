import { createContext } from "react";
import { TripRequest } from '../../shared/entities/tripRequest';

type SelectedTripRequestContextType = {
  selectedTripRequest: TripRequest | null;
  setSelectedTripRequest: React.Dispatch<React.SetStateAction<TripRequest | null>>;
};

export const SelectedTripRequestContext = createContext<SelectedTripRequestContextType>({} as SelectedTripRequestContextType);