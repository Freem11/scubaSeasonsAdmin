import React, { createContext } from 'react';
import { ActiveProfile } from '../entities/profile';

type UserProfileContextType = {
  profile:    ActiveProfile | null
  setProfile: React.Dispatch<React.SetStateAction<ActiveProfile | null>>
};

export const UserProfileContext = createContext<UserProfileContextType>({} as UserProfileContextType);
