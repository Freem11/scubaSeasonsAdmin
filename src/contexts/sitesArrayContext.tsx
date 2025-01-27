import React, { createContext } from 'react';
import { DiveSiteBasic } from '../entities/diveSite';

type SitesArrayContextType = {
  sitesArray:    DiveSiteBasic[]
  setSitesArray: React.Dispatch<React.SetStateAction<DiveSiteBasic[]>>
};

export const SitesArrayContext = createContext<SitesArrayContextType>({} as SitesArrayContextType);


