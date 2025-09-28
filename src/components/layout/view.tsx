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
import ReviewPhotoList from '../reviewPhotoList';
import { SelectedPendingReviewPhotoContext } from '../../contexts/reviewPhotoEvals/selectedReviewPhotoContext';
import ReviewPhotoEval from '../reviewPhotoEvaluation';

export default function LayoutMainView() {
  const { selectedSeaLife } = useContext(SelectedSeaLifeContext);
  const { selectedPendingDiveSite } = useContext(SelectedPendingDiveSiteContext);
  const { selectedReviewPhoto } = useContext(SelectedPendingReviewPhotoContext);
  const {selectedTripRequest} = useContext(SelectedTripRequestContext)
  const { selectedPartnerRequest } = useContext(SelectedPartnerRequestContext);
  
  return (
    <div className="container-fluid">
      <div className="cols col-gapless">
        <div className="col-4" style={{ overflowX: 'hidden', overflowY: 'scroll', height: '100vh' }}>
          <Tabs data={[
            { key: 't-1', title: 'Sea Life', content: SeaLifePhotoList },
            { key: 't-2', title: 'Dive Sites', content: DiveSiteList },
            { key: 't-3', title: 'Review Photos', content: ReviewPhotoList },
            { key: 't-4', title: 'Partner Requests', content: PartnerRequestList },
            { key: 't-5', title: 'Trip Requests', content: TripRequestList }
          ]} />
        </div>
        <div className="col-8" style={{ overflowX: 'hidden', overflowY: 'scroll', height: '100vh' }}>
          {selectedSeaLife && <SeaLifePhotoEval />}
          {selectedPendingDiveSite && <DiveSiteEval />}
          {selectedReviewPhoto && <ReviewPhotoEval />}
          {selectedTripRequest && <TripRequestEval/>}
          {selectedPartnerRequest && <PartnerRequestEval />}
        </div>
      </div>
    </div>
  );
}
