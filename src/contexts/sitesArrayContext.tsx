import React, { createContext } from 'react';

type SitesArrayContextType = {
  sitesArray:    number[]
  setSitesArray: React.Dispatch<React.SetStateAction<number[]>>
};

export const SitesArrayContext = createContext<SitesArrayContextType>({} as SitesArrayContextType);


