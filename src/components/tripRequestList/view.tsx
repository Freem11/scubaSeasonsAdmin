import style from './styles.module.scss';
import { TripRequest } from "../../entities/tripRequest";
import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";
import { useContext } from 'react';
import { SelectedSeaLifeContext } from '../../contexts/seaLifeEvals/selectedSeaLifePhotoContext';
import { SelectedPendingDiveSiteContext } from '../../contexts/diveSiteEvals/selectedDiveSiteContext';

type TripRequestListProps = {
    pendingTripRequestList: TripRequest[] | null
  };

export default function TripRequestListView(props: TripRequestListProps) {

    const { setSelectedTripRequest } = useContext(SelectedTripRequestContext);
    const { setSelectedPendingDiveSite } = useContext(SelectedPendingDiveSiteContext);
    const { setSelectedSeaLife } = useContext(SelectedSeaLifeContext);
        
        const setupTripRequest = (record: TripRequest) => {
            setSelectedSeaLife(null)
            setSelectedPendingDiveSite(null)
            setSelectedTripRequest(record)
        };
    
    return (
        <div className="mt-4 flex-column">
        {props.pendingTripRequestList && props.pendingTripRequestList.map((record: TripRequest) => {
            return (
            <div className={`${style.cardMain} ${record.requestType === "Delete" ? `${style.cardDelete}` : `${style.cardEdit}`}`} key={record.id} onClick={() => setupTripRequest(record)}>
                <div className={`py-2 px-2 ${style.fullWidth}`}>
                    <div>{record.tripName.length > 40 ? record.tripName.slice(0, 40) + "..." : record.tripName} - {record.requestType} </div> 
                </div>
            </div>
            )})
        }
    </div>
    )
}