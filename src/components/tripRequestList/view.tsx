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
            <div className={style.cardMain} key={`1`} onClick={() => {}}>
                <div className={`py-2 ${style.fullWidth}`}>
                    <div>{record.description.length > 40 ? record.description.slice(0, 40) + "..." : record.description} </div> 
                </div>
                <div className="flex-column">
                    <div className={`px-2 py-1 ${record.requestType === "Delete" ? `${style.textDanger}` : `${style.textSuccess}`}`}>
                        <div>{record.requestType}</div>
                    </div>
                </div>
            </div>
            )})
        }
    </div>
    )
}