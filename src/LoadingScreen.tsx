import './loadingScreen.css';
import MantaRay from './assets/Matt_Manta_White.png';

const LoadingScreen = () => (
    <div className="screenDiv">
      <div className="containerMain">
        <img src={MantaRay} className="mantaLogo"></img>

        <div className="logoDiv">Scuba SEAsons</div>
      </div>
    </div>
  );

export default LoadingScreen;