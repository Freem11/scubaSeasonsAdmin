import React, { useContext } from 'react';
import { Form } from './form';
import PasswordRecoveryView from './view';
import { SliderContext } from '../../reusables/slider/context';
import { sendPasswordResetEmail } from '../../apicalls/supabaseCalls/authenticateSupabaseCalls';
import { toast } from 'react-toastify';
import screenData from '../../screenData.json';

export default function PasswordRecoveryPage() {
  const { goToSlide } = useContext(SliderContext);

  const onSubmit = async (data: Form) => {
    const response = await sendPasswordResetEmail(data.email, window.location.origin + '/account/password/');

    if (!response.error && response.data) {
      toast.success(screenData.PasswordRecoveryPage.passwordResetEmailSent);
      return;
    }

    if (response.error && response.error.message) {
      toast.error(response.error.message);
      return;
    }

    toast.error(screenData.PasswordRecoveryPage.passwordResetError);
  };

  return (
    <PasswordRecoveryView
      goToSlide={goToSlide}
      onSubmit={onSubmit}
    />
  );
}
