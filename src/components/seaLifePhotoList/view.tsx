import { useContext } from "react";
import { SelectedSeaLifeContext } from "../../contexts/seaLifeEvals/selectedSeaLifePhotoContext";
import { SeaLifePhoto } from "../../entities/seaLifePhoto";
import style from './styles.module.scss';
import { SelectedPendingDiveSiteContext } from "../../contexts/diveSiteEvals/selectedDiveSiteContext";
import { SelectedPartnerRequestContext } from '../../contexts/partnerRequestEvals/selectedPartnerRequestContext';
import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";

type SeaLifePhotoListProps = {
    photoRecords: SeaLifePhoto[] | null
  };

export default function SeaLifePhotoListView(props: SeaLifePhotoListProps) {
    const { setSelectedSeaLife } = useContext(SelectedSeaLifeContext)
    const { setSelectedPendingDiveSite } = useContext(SelectedPendingDiveSiteContext)
    const { setSelectedPartnerRequest } = useContext(SelectedPartnerRequestContext)
    const { setSelectedTripRequest } = useContext(SelectedTripRequestContext);
       
    const setupSeaLife = (record: SeaLifePhoto) => {
        setSelectedSeaLife(record)
        setSelectedPendingDiveSite(null)
        setSelectedPartnerRequest(null)
        setSelectedTripRequest(null)
    };

return (
    <div className="mt-4 flex-column">
    {props.photoRecords && props.photoRecords.map((record) => {
          const photoName = record.photofile.split('/').pop();
        return (
        <div className={style.cardMain} key={record.id} onClick={() => setupSeaLife(record)}>
            <div className={style.pic}>
            <img src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`} width={200} style={{borderRadius: "5%"}}></img>
            </div>
            <div className="full-height flex-column">
                <div>{record.label}</div> 
            </div>
        </div>
    )
    })}
</div>
)
}