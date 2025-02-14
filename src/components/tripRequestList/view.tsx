import style from './styles.module.scss';
import { TripRequest } from "../../entities/tripRequest";

type TripRequestListProps = {
    pendingTripRequestList: TripRequest[] | null
  };

export default function TripRequestListView(props: TripRequestListProps) {
    return (
        <div className="mt-4 flex-column">
        {props.pendingTripRequestList && props.pendingTripRequestList.map((record: TripRequest) => {
            return (
            <div className={`${style.cardMain} ${record.requestType === "Delete" ? `${style.cardDelete}` : `${style.cardEdit}`}`} key={record.id} onClick={() => {}}>
                <div className={`py-2 ${style.fullWidth}`}>
                    <div>{record.tripName.length > 40 ? record.tripName.slice(0, 40) + "..." : record.tripName} - {record.requestType} </div> 
                </div>
            </div>
            )})
        }
    </div>
    )
}