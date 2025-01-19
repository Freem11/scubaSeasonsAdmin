import React, { Dispatch, SetStateAction } from 'react';
import Button from '../../reusables/button';
import blackManta from '../../assets/blackManta.png';
import googleIcon from '../../assets/google-color.png';
import facebookIcon from '../../assets/facebook-color.png';
import appleIcon from '../../assets/apple.png';
import style from './style.module.scss';
import screenData from '../../screenData.json';
import { ActiveProfile } from '../../entities/profile';
import ButtonIcon from '../../reusables/buttonIcon';
import WavyBlock from '../../reusables/wavyBlock';

type LandingPageProps = {
  goToSlide:    (pageNumber: number) => void
  setProfile:   Dispatch<SetStateAction<ActiveProfile | null>>
  socialSignIn: (provider: any) => void
};

export default function LandingPageView(props: LandingPageProps) {
  return (
    <div className="flex-column-between full-height">
      <div>
        <div className={style.wavyHeader} style={{ backgroundImage: `url(${blackManta})` }}>
          <WavyBlock />
        </div>

        <h1 className="ml-10 text-clip text-left">{screenData.LandingPage.title}</h1>

        <div className="flex-centered">
          <div className="col-6">
            <Button className="btn-primary btn-lg" onClick={() => props.goToSlide(2)}>
              {screenData.LandingPage.buttonOneText}
            </Button>
            <Button className="btn-lg mt-4" onClick={() => props.goToSlide(0)}>
              {screenData.LandingPage.buttonTwoText}
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 text-center">{screenData.LandingPage.content}</div>
        <div className="flex-centered">
          <div className="col-6 flex-row-between" style={{ height: '3.5rem' }}>
            <ButtonIcon
              icon={<img src={googleIcon} alt="Google" onClick={() => props.socialSignIn('google')} />}
              className="full-height"
            />
            <ButtonIcon
              icon={<img src={facebookIcon} alt="Facebook" onClick={() => props.socialSignIn('facebook')} />}
              className="full-height"
            />
            <ButtonIcon
              icon={<img src={appleIcon} alt="Apple" onClick={() => props.socialSignIn('apple')} />}
              className="full-height"
            />
          </div>
        </div>
      </div>

      <div>{/* empty block to make 'flex-column-between' add some space */}</div>
    </div>
  );
}
