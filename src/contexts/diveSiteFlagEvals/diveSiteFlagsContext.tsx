import { createContext } from "react";
import { UserRequest } from '../../entities/userRequest';

type DiveSiteFlagsContextType = {
  diveSiteFlags: UserRequest[] | null;
  setDiveSiteFlags: React.Dispatch<React.SetStateAction<UserRequest[] | null>>;
};

export const DiveSiteFlagsContext = createContext<DiveSiteFlagsContextType>({} as DiveSiteFlagsContextType);
