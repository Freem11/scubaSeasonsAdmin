import { PartnerRequest } from '../../entities/partnerRequest';
import Button from "../../reusables/button";
import style from './styles.module.scss';
import MapLoader from "../googleMap";

interface ComponentViewProps {
  isLoading: boolean
  onReject: () => void
  onApprove: () => void
  partnerData: PartnerRequest | null
}

export default function PartnerRequestEvalView(props: ComponentViewProps) {
  const {onApprove , onReject, partnerData, isLoading} = props;

  if (!partnerData) {
    return <div>please choose partner</div>;
  }
  
  return (
    <div>
      <div style={{height: '70vh', width: '100%'}}>
        <MapLoader/>
      </div>
      <div style={{height: '30vh'}}>
        <div className="mt-2">
          <div className="col-12 my-2">
              {partnerData.businessName || 'ERROR'}
          </div>
        </div>
        <div className="col-12 flex-row-between mt-2" style={{alignItems: 'center', justifyContent: 'space-between'}}>
          <h6 className={style.tagBox}>
            {`Contributor: ${partnerData.userEmail}` || 'ERROR'}
          </h6>
          <h6 className={style.tagBox}>
              {`Lat: ${partnerData.latitude}` || 'ERROR'}
          </h6>
          <h6 className={style.tagBox}>
            {`Lng: ${partnerData.longitude}` || 'ERROR'}
          </h6>
          <h6 className={style.tagBox}>
            {`Website: ${partnerData.webpageLink}` || 'ERROR'}
          </h6>
        </div>
        <div className="cols col-12 mt-8 flex-row-between">
          <div className="col-3">
            <Button
              onClick={onApprove}
              className="btn-md bg-primary"
              disabled={isLoading}
            >
              Approve
            </Button>
          </div>
          <div className="col-3">
            <Button
              onClick={onReject}
              className="btn-md"
              disabled={isLoading}
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
