import { useEffect, useLayoutEffect, useState } from 'react';
import { SessionContext } from '../state/sessionContext';
import './App.css'
import { supabase } from '../api/supabase/supabase';
import { sessionCheck, sessionRefresh } from '../api/supabase/authenticateSupabaseCalls';
import { ActiveSession } from '../shared/entities/session';
import LoadingScreen from './LoadingScreen';
import { UserProfileContext } from '../state/userProfileContext';
import { ActiveProfile } from '../shared/entities/profile';
import AuthenticationPage from '../authentication';
import LayoutMainView from './layout';
import { SelectedSeaLifeContext } from '../state/seaLifeEvals/selectedSeaLifePhotoContext';
import { DiveSite, DiveSiteBasic } from '../shared/entities/diveSite';
import { SelectedPendingDiveSiteContext } from '../state/diveSiteEvals/selectedDiveSiteContext';
import { SitesArrayContext } from '../state/sitesArrayContext';
import { MapContextProvider } from '../shared/ui/googleMap/mapContextProvider';
import { SelectedTripRequestContext } from '../state/tripRequestEvals/selectedTripRequestContext';
import { TripRequest } from '../shared/entities/tripRequest';
import { SelectedPartnerRequestContext } from '../state/partnerRequestEvals/selectedPartnerRequestContext';
import { PartnerRequest } from '../shared/entities/partnerRequest';
import { ShopsArrayContext } from '../state/shopsArrayContext';
import { DiveShopBasic } from '../shared/entities/diveShop';
import { ReviewPhotoWithInfo } from '../shared/entities/reviewPhotoWithInfo';
import { SelectedPendingReviewPhotoContext } from '../state/reviewPhotoEvals/selectedReviewPhotoContext';
import { SeaLifeHeadersContext } from '../state/seaLifeHeaders/seaLifeHeaderContext';
import { Species } from '../shared/entities/species';
import { SpeciesContext } from '../state/seaLifeHeaders/speciesContext';
import { SeaLifePhoto } from '../shared/entities/seaLifePhoto';
import { SelectedUnverifiedDiveSiteContext } from '../state/unverifieddiveSiteEvals/selectedDiveSiteContext';
import { ToastContainer } from 'react-toastify';
import { DiveSitesWithHeadersContext } from '../state/diveSitesWithHeaders/diveSitesWithHeadersContext';
import { DiveSiteWithHeader } from '../shared/entities/diveSiteWithHeader';
import { SelectedDiveSiteWithHeadersContext } from '../state/diveSitesWithHeaders/selectedDiveSiteWithHeadersContext';

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [profile, setProfile] = useState<ActiveProfile | null>(null);
  const [selectedSeaLife, setSelectedSeaLife] = useState<SeaLifePhoto | null>(null)
  const [selectedReviewPhoto, setSelectedReviewPhoto] = useState<ReviewPhotoWithInfo | null>(null)
  const [selectedTripRequest, setSelectedTripRequest] = useState<TripRequest | null>(null)
  const [headerlessSpecies, setHeaderlessSpecies] = useState<Species[] | null>(null)
  const [species, setSpecies] = useState<string | null>(null);
  const [selectedPendingDiveSite, setSelectedPendingDiveSite] = useState<DiveSite | null>(null)
  const [selectedUnverifiedDiveSite, setSelectedUnverifiedDiveSite] = useState<DiveSite | null>(null)
  const [sitesArray, setSitesArray] = useState<DiveSiteBasic[]>([]);
  const [selectedPartnerRequest, setSelectedPartnerRequest] = useState<PartnerRequest | null>(null)
  const [shopsArray, setShopsArray] = useState<DiveShopBasic[]>([]);
  const [diveSitesWithHeaders, setDiveSitesWithHeaders] = useState<DiveSiteWithHeader[]>([]);
  const [selectedDiveSiteWithHeaders, setSelectedDiveSiteWithHeaders] = useState<DiveSiteWithHeader | null>(null);
  
  
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
          <ShopsArrayContext.Provider value={{ shopsArray, setShopsArray }}>
            <DiveSitesWithHeadersContext.Provider value={{ diveSitesWithHeaders, setDiveSitesWithHeaders }}>
              <SelectedDiveSiteWithHeadersContext.Provider value={{ selectedDiveSiteWithHeaders, setSelectedDiveSiteWithHeaders}}>
            <SelectedPendingReviewPhotoContext.Provider value={{ selectedReviewPhoto, setSelectedReviewPhoto }}>
            <SelectedPartnerRequestContext.Provider value={{ selectedPartnerRequest, setSelectedPartnerRequest }}>
              <SelectedUnverifiedDiveSiteContext.Provider value={{ selectedUnverifiedDiveSite, setSelectedUnverifiedDiveSite }}>
              <SelectedPendingDiveSiteContext.Provider value={{ selectedPendingDiveSite, setSelectedPendingDiveSite }}>
                <SelectedSeaLifeContext.Provider value={{ selectedSeaLife, setSelectedSeaLife }}>
                  <SelectedTripRequestContext.Provider value={{ selectedTripRequest, setSelectedTripRequest }}>
                    <SpeciesContext.Provider value={{ species, setSpecies }}>
                    <SeaLifeHeadersContext.Provider value={{ headerlessSpecies, setHeaderlessSpecies}}>
                    <MapContextProvider>
                     {/* { !activeSession ? <AuthenticationPage /> : <AdminPage />} */}
                     { !activeSession ? <AuthenticationPage /> : <LayoutMainView />}
                     <ToastContainer />
                   </MapContextProvider>
                   </SeaLifeHeadersContext.Provider>
                   </SpeciesContext.Provider>
                 </SelectedTripRequestContext.Provider>
               </SelectedSeaLifeContext.Provider>
             </SelectedPendingDiveSiteContext.Provider>
             </SelectedUnverifiedDiveSiteContext.Provider>
           </SelectedPartnerRequestContext.Provider>
           </SelectedPendingReviewPhotoContext.Provider>
           </SelectedDiveSiteWithHeadersContext.Provider>
           </DiveSitesWithHeadersContext.Provider>
         </ShopsArrayContext.Provider>
       </SitesArrayContext.Provider>
      </UserProfileContext.Provider>
    </SessionContext.Provider>
  )
}

export default App
