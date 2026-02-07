import { createContext } from 'react';
import { TripRequest } from '../../entities/tripRequest';

type TripRequestContextType = {
  tripRequests: TripRequest[] | null;
  setTripRequests: React.Dispatch<React.SetStateAction<TripRequest[] | null>>;
};

export const TripRequestsContext = createContext<TripRequestContextType>({} as TripRequestContextType);