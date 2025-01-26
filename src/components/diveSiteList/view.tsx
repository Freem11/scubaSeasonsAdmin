import { useContext } from "react";
import { SelectedPendingDiveSiteContext } from "../../contexts/diveSiteEvals/selectedDiveSiteContext"
import { DiveSite } from "../../entities/diveSite";
import style from './styles.module.scss';
import { MapContext } from "../googleMap/mapContext";
import { SelectedSeaLifeContext } from "../../contexts/seaLifeEvals/selectedSeaLifePhotoContext";

type DiveSiteListProps = {
    pendingDiveSitesList: DiveSite[] | null
  };

export default function DiveSiteListView(props: DiveSiteListProps) {
    const { setInitialPoint, mapRef } = useContext(MapContext);
    const { setSelectedPendingDiveSite } = useContext(SelectedPendingDiveSiteContext)
    const { setSelectedSeaLife } = useContext(SelectedSeaLifeContext)

    const setupMap = (record: DiveSite) => {
        setSelectedSeaLife(null)
        setInitialPoint([record?.lat, record?.lng]);
        setSelectedPendingDiveSite(record)
        mapRef?.panTo({ lat: record?.lat, lng: record?.lng });
    };

return (
    <div className="mt-4 flex-column">
    {props.pendingDiveSitesList && props.pendingDiveSitesList.map((record: DiveSite) => {
        return (
        <div className={style.cardMain} key={record.id} onClick={() => setupMap(record)}>
            <div className='py-2'>
                <div>{record.name}</div> 
            </div>
        </div>
    )
    })}
</div>
)
}