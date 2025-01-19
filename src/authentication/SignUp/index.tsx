import React, { useContext } from 'react';
import { SliderContext } from '../../reusables/slider/context';
import { Form } from './form';
import SignUpPageView from './view';
import { register, sessionCheck } from '../../apicalls/supabaseCalls/authenticateSupabaseCalls';
import { createProfile } from '../../apicalls/supabaseCalls/accountSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';
import { toast } from 'react-toastify';
import screenData from '../../screenData.json';

export default function SignUpPage() {
  const { setActiveSession } = useContext(SessionContext);
  const { goToSlide } = useContext(SliderContext);

  const onSubmit = async (data: Form) => {
    const response = await register(data);
    const session = response.data.session;

    if (response.error?.message) {
      toast.error(response.error.message);
      return;
    }

    if (session !== null) {
      await createProfile({ id: session.user.id, email: data.email });
      await localStorage.setItem(
        'token',
        JSON.stringify(session.refresh_token),
      );
      setActiveSession(session);
    } else {
      toast.error(screenData.SignUpPage.signUpError);
    }
    await sessionCheck();
  };

  return (
    <SignUpPageView
      onSubmit={onSubmit}
      goToSlide={goToSlide}
    />
  );
}
