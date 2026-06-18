import { useContext } from 'react';
import { SliderContext } from '../../reusables/slider/context';
import { Form } from './form';
import { signInStandard } from '../../apicalls/supabaseCalls/authenticateSupabaseCalls';
import SignInPageView from './view';
import { toast } from 'react-toastify';
import screenData from '../../screenData.json';


export default function SignInPage() {
  const { goToSlide } = useContext(SliderContext);

  const onSubmit = async (data: Form) => {
    const response = await signInStandard(data);
    
    // If there's an error or no session returned, show the error toast.
    // Otherwise, do nothing! App.tsx's listener will automatically update the UI.
    if (!response?.data?.session) {
      toast.error(screenData.SignInPage.signInError);
    }
  };

  return (
    <SignInPageView
      onSubmit={onSubmit}
      goToSlide={goToSlide}
    />
  );
}