import { createContext } from 'react';
import { TripRequest } from '../../entities/tripRequest';

type TripRequestsContextType = {
  tripRequests: TripRequest[] | null;
  setTripRequests: React.Dispatch<React.SetStateAction<TripRequest[] | null>>;
};

export const TripRequestsContext = createContext<TripRequestsContextType>({} as TripRequestsContextType);