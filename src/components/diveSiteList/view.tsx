import { useContext, useEffect } from "react";
import { SelectedDiveSiteContext } from "../../contexts/selectDiveSiteContext"
import { DiveSite } from "../../entities/diveSite";
import style from './styles.module.scss';
import { MapContext } from "../googleMap/mapContext";
import { SelectedSeaLifeContext } from "../../contexts/selectSeaLifePhotoContext";

type DiveSiteListProps = {
    diveSitesList: DiveSite[] | null
  };

export default function DiveSiteListView(props: DiveSiteListProps) {
    const { setInitialPoint, mapRef } = useContext(MapContext);
    const { selectedDiveSite, setSelectedDiveSite } = useContext(SelectedDiveSiteContext)
    const { setSelectedSeaLife } = useContext(SelectedSeaLifeContext)

    const setupMap = (record: DiveSite) => {
        setSelectedSeaLife(null)
        setInitialPoint([record?.lat, record?.lng]);
        setSelectedDiveSite(record)
        mapRef?.panTo({ lat: record?.lat, lng: record?.lng });
    };

return (
    <div className="mt-4 flex-column">
    {props.diveSitesList && props.diveSitesList.map((record: DiveSite) => {
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