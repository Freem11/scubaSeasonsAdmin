import React from 'react';
import style from './style.module.scss';
import SignUpPage from './SignUp';
import LandingPage from './Landning';
import SignInPage from './SignIn';
import PasswordRecoveryPage from './PasswordRecovery';
import Slider from '../reusables/slider';

export default function AuthnticationPageView() {
  return (
    <div className={style.container}>
      <div className={style.centerPage}>
        <Slider
          startIndex={1}
          showArrows={false}
          slides={[
            <SignUpPage key="step1" />,
            <LandingPage key="step2" />,
            <SignInPage key="step3" />,
            <PasswordRecoveryPage key="step4" />,
          ]}
        />
      </div>
    </div>
  );
}
