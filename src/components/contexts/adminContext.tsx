import { createContext, useState } from 'react';

export const AdminContext = createContext('');

// @ts-ignore
// eslint-disable-next-line react/function-component-definition
const AdminContextProvider: React.FC<React.ReactNode> = ({children}) => {
    const [adminStat, setAdminStat] = useState<boolean>(false);
    const values = {adminStat, setAdminStat};

    return (
        <AdminContext.Provider value={values}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;