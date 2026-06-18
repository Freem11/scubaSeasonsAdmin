import { useContext } from 'react';
import LandingPageView from './view';
import { SliderContext } from '../../reusables/slider/context';
import { socialSignIn } from '../../apicalls/supabaseCalls/authenticateSupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';

export default function LandingPage() {
  const { goToSlide } = useContext(SliderContext);
  const { setProfile } = useContext(UserProfileContext);

  async function getSocialSignIn(provider: any) {
    await socialSignIn(provider);
    // if (signInData) handleSupabaseSetup(signInData);
  }

  /*
        NOTE ON OAUTH FLOW & PROFILE CREATION:
        `socialSignIn(provider)` triggers an immediate browser window redirect 
        to the external OAuth provider (Google, Apple, etc.). Because the user 
        leaves our application instantly, downstream code or local state setups 
        placed here will never execute during the initial sign-in attempt.
        
        To prevent dead logic, the post-authentication sync—checking if a custom 
        public profile row exists and creating it if it doesn't, should be considered to be 
        centralized globally within the `onAuthStateChange` listener in `App.tsx`. This catches 
        the user cleanly the exact moment they are routed back to our root URL.
      */

  // async function handleSupabaseSetup(sessionToken: any) {
  //   if (sessionToken) {
  //     let sanitizeData;
  //     if (sessionToken.session) {
  //       sanitizeData = sessionToken.session;
  //     } else {
  //       sanitizeData = sessionToken;
  //     }

  //     const profileCheck = await grabProfileById(sanitizeData.user.id);

  //     if (profileCheck && profileCheck.length === 0) {
  //       await createProfile({
  //         id: sanitizeData.user.id,
  //         email: sanitizeData.user.email,
  //       });
  //     }
  //   }
  // }

  return (
    <LandingPageView
      goToSlide={goToSlide}
      setProfile={setProfile}
      socialSignIn={getSocialSignIn}
    />
  );
}
