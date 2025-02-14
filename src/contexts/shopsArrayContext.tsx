import React, { createContext } from 'react';
import { DiveShopBasic } from '../entities/diveShop';

type ShopsArrayContextType = {
  shopsArray:    DiveShopBasic[]
  setShopsArray: React.Dispatch<React.SetStateAction<DiveShopBasic[]>>
};

export const ShopsArrayContext = createContext<ShopsArrayContextType>({} as ShopsArrayContextType);


