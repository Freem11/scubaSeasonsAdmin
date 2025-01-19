import React, { createContext } from 'react';
import { ActiveSession } from './session';

type SessionContextType = {
  activeSession:    ActiveSession | null
  setActiveSession: React.Dispatch<React.SetStateAction<ActiveSession | null>>
};

export const SessionContext = createContext<SessionContextType>({} as SessionContextType);

