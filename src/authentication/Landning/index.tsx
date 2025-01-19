import React, { useContext } from 'react';
import { SessionContext } from '../../contexts/sessionContext';
import LandingPageView from './view';
import { SliderContext } from '../../reusables/slider/context';
import { socialSignIn } from '../../apicalls/supabaseCalls/authenticateSupabaseCalls';
import { createProfile, grabProfileById } from '../../apicalls/supabaseCalls/accountSupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ActiveSession } from '../../entities/session';

export default function LandingPage() {
  const { goToSlide } = useContext(SliderContext);
  const { setActiveSession } = useContext(SessionContext);
  const { setProfile } = useContext(UserProfileContext);

  async function getSocialSignIn(provider: any) {
    const signInData = socialSignIn(provider);
    if (signInData) handleSupabaseSetup(signInData, setActiveSession);
  }

  async function handleSupabaseSetup(sessionToken: any, setActiveSession: React.Dispatch<React.SetStateAction<ActiveSession | null>>) {
    if (sessionToken) {
      await localStorage.setItem('token', JSON.stringify(sessionToken));
      if (sessionToken.session) {
        setActiveSession(sessionToken.session);
      } else {
        setActiveSession(sessionToken);
      }
      let sanitizeData;
      if (sessionToken.session) {
        sanitizeData = sessionToken.session;
      } else {
        sanitizeData = sessionToken;
      }

      const profileCheck = await grabProfileById(sanitizeData.user.id);

      if (profileCheck && profileCheck.length === 0) {
        await createProfile({
          id:    sanitizeData.user.id,
          email: sanitizeData.user.email,
        });
      }
    }
  }

  return (
    <LandingPageView
      goToSlide={goToSlide}
      setProfile={setProfile}
      socialSignIn={getSocialSignIn}
    />
  );
}
