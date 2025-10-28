import { useContext } from "react";
import { SelectedSeaLifeContext } from "../../contexts/seaLifeEvals/selectedSeaLifePhotoContext";
import style from './styles.module.scss';
import { SelectedPendingDiveSiteContext } from "../../contexts/diveSiteEvals/selectedDiveSiteContext";
import { SelectedPartnerRequestContext } from '../../contexts/partnerRequestEvals/selectedPartnerRequestContext';
import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";
import { ReviewPhotoWithInfo } from "../../entities/reviewPhotoWithInfo";
import { SelectedPendingReviewPhotoContext } from "../../contexts/reviewPhotoEvals/selectedReviewPhotoContext";
import { cloudflareBucketUrl } from "../../globalVariables";

type ReviewPhotoListProps = {
    photoRecords: ReviewPhotoWithInfo[] | null
  };

export default function ReviewPhotoListView(props: ReviewPhotoListProps) {
    const { setSelectedSeaLife } = useContext(SelectedSeaLifeContext)
    const { setSelectedPendingDiveSite } = useContext(SelectedPendingDiveSiteContext)
    const { setSelectedPartnerRequest } = useContext(SelectedPartnerRequestContext)
    const { setSelectedTripRequest } = useContext(SelectedTripRequestContext);
    const { setSelectedReviewPhoto } = useContext(SelectedPendingReviewPhotoContext);
    
       
    const setupReviewPhoto = (record: ReviewPhotoWithInfo) => {
        setSelectedReviewPhoto(record)
        setSelectedSeaLife(null)
        setSelectedPendingDiveSite(null)
        setSelectedPartnerRequest(null)
        setSelectedTripRequest(null)
    };

return (
    <div className="mt-4 flex-column">
    {props.photoRecords && props.photoRecords.map((record) => {
          const photoName = record.photoPath.split('/').pop();
        return (
        <div className={style.cardMain} key={record.id} onClick={() => setupReviewPhoto(record)}>
            <div className={style.pic}>
            <img src={`${cloudflareBucketUrl}${photoName}`} width={200} style={{borderRadius: "5%"}}></img>
            </div>
        </div>
    )
    })}
</div>
)
}