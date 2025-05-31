import { useContext } from 'react';
import Tabs from '../../reusables/tabs';
import DiveSiteEval from '../diveSiteEvaluation';
import DiveSiteList from '../diveSiteList';
import PartnerRequestList from '../partnerRequestList';
import PartnerRequestEval from '../partnerRequestEvaluation';
import SeaLifePhotoEval from '../seaLifePhotoEvaluation';
import SeaLifePhotoList from '../seaLifePhotoList';
import { SelectedSeaLifeContext } from '../../contexts/seaLifeEvals/selectedSeaLifePhotoContext';
import { SelectedPendingDiveSiteContext } from '../../contexts/diveSiteEvals/selectedDiveSiteContext';
import { SelectedPartnerRequestContext } from '../../contexts/partnerRequestEvals/selectedPartnerRequestContext';
import TripRequestList from "../tripRequestList";
import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";
import TripRequestEval from "../tripRequestEvaluation";

export default function LayoutMainView() {
  const { selectedSeaLife } = useContext(SelectedSeaLifeContext);
  const { selectedPendingDiveSite } = useContext(SelectedPendingDiveSiteContext);
  const {selectedTripRequest} = useContext(SelectedTripRequestContext)
  const { selectedPartnerRequest } = useContext(SelectedPartnerRequestContext);
  
  return (
    <div className="container-fluid">
      <div className="cols col-gapless">
        <div className="col-4" style={{ overflowX: 'hidden', overflowY: 'scroll', height: '100vh' }}>
          <Tabs data={[
            { key: 't-1', title: 'Sea Life', content: SeaLifePhotoList },
            { key: 't-2', title: 'Dive Sites', content: DiveSiteList },
            { key: 't-3', title: 'Partner Requests', content: PartnerRequestList },
            { key: 't-4', title: 'Trip Requests', content: TripRequestList }
          ]} />
        </div>
        <div className="col-8" style={{ overflowX: 'hidden', overflowY: 'scroll', height: '100vh' }}>
          {selectedSeaLife && <SeaLifePhotoEval />}
          {selectedPendingDiveSite && <DiveSiteEval />}
          {selectedTripRequest && <TripRequestEval/>}
          {selectedPartnerRequest && <PartnerRequestEval />}
        </div>
      </div>
    </div>
  );
}
