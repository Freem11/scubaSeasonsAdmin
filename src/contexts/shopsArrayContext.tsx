import React, { createContext } from 'react';
import { DiveShopBasic } from '../shared/entities/diveShop';

type ShopsArrayContextType = {
  shopsArray:    DiveShopBasic[]
  setShopsArray: React.Dispatch<React.SetStateAction<DiveShopBasic[]>>
};

export const ShopsArrayContext = createContext<ShopsArrayContextType>({} as ShopsArrayContextType);


