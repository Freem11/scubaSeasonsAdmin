import React, { createContext } from 'react';
import { ActiveProfile } from '../shared/entities/profile';

type UserProfileContextType = {
  profile:    ActiveProfile | null
  setProfile: React.Dispatch<React.SetStateAction<ActiveProfile | null>>
};

export const UserProfileContext = createContext<UserProfileContextType>({} as UserProfileContextType);
