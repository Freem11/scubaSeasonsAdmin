import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { SessionContext } from './contexts/sessionContext';
import AdminPage from './components/adminPage';
import './App.css'
import { supabase } from './apicalls/supabase';
import { sessionCheck, sessionRefresh } from './apicalls/supabaseCalls/authenticateSupabaseCalls';
import { ActiveSession } from './entities/session';
import LoadingScreen from './LoadingScreen';
import { UserProfileContext } from './contexts/userProfileContext';
import { ActiveProfile } from './entities/profile';
import AuthenticationPage from './authentication';
import LayoutMainView from './components/layout';
import { SelectedSeaLifeContext } from './contexts/selectSeaLifePhotoContext';
import { SeaLifePhoto } from './entities/seaLifePhoto';
import { DiveSite } from './entities/diveSite';
import { SelectedDiveSiteContext } from './contexts/selectDiveSiteContext';
import { SitesArrayContext } from './contexts/sitesArrayContext';
import { MapContextProvider } from './components/googleMap/mapContextProvider';

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [profile, setProfile] = useState<ActiveProfile | null>(null);
  const [selectedSeaLife, setSelectedSeaLife] = useState<SeaLifePhoto | null>(null)
  const [selectedDiveSite, setSelectedDiveSite] = useState<DiveSite | null>(null)
  const [sitesArray, setSitesArray] = useState<number[]>([]);
  
  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getSession().then((value) => {
        localStorage.setItem('tokenAdmin', JSON.stringify(value.data.session));
        setActiveSession(value.data.session);
      });
    }
    getUserData();
  }, []);
  
  const handleStartup = async () => {
    try {
      const valuless = localStorage.getItem('tokenAdmin');
      if (valuless) {
        const value = JSON.parse(valuless);
        if (value && value.session) {
          if (value.session.refresh_token) {
            const newSession = await sessionRefresh(
              value.session.refresh_token,
            );
            if(newSession){
              setActiveSession(newSession.session);
            }

          }
        }
      }
      await sessionCheck();
      localStorage.removeItem('tokenAdmin');
    } catch (error) {
      console.log('no dice:', error);
    }

      setAppIsReady(true);
  };
  
  useLayoutEffect(() => {
    handleStartup();
  }, []);

  if (!appIsReady) {
    return <LoadingScreen />;
  }
  
  return (
    <SessionContext.Provider value={{ activeSession, setActiveSession }}>
         <UserProfileContext.Provider value={{ profile, setProfile }}>
          <SitesArrayContext.Provider value={{ sitesArray, setSitesArray }}>
          <SelectedDiveSiteContext.Provider value={{ selectedDiveSite, setSelectedDiveSite }}>
          <SelectedSeaLifeContext.Provider value={{ selectedSeaLife, setSelectedSeaLife }}>
            <MapContextProvider>
         {/* { !activeSession ? <AuthenticationPage /> : <AdminPage />} */}
         { !activeSession ? <AuthenticationPage /> : <LayoutMainView />}
         </MapContextProvider>
         </SelectedSeaLifeContext.Provider>
         </SelectedDiveSiteContext.Provider>
         </SitesArrayContext.Provider>
      </UserProfileContext.Provider>
    </SessionContext.Provider>
  )
}

export default App
