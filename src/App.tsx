import { useEffect, useLayoutEffect, useState } from 'react';
import { SessionContext } from './contexts/sessionContext';
import AdminPage from './components/adminPage';
import './App.css'
import { supabase } from './apicalls/supabase';
import { sessionCheck, sessionRefresh } from './apicalls/supabaseCalls/authenticateSupabaseCalls';
import { ActiveSession } from './contexts/session';
import LoadingScreen from './LoadingScreen';

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getSession().then((value) => {
        localStorage.setItem('token', JSON.stringify(value.data.session));
        setActiveSession(value.data.session);
      });
    }
    getUserData();
  }, []);
  
  const handleStartup = async () => {
    try {
      const valuless = localStorage.getItem('token');
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
      localStorage.removeItem('token');
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
      <AdminPage />
    </SessionContext.Provider>
  )
}

export default App
