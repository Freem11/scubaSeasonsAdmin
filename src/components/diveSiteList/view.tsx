import { useContext } from "react";
import { SelectedPendingDiveSiteContext } from "../../contexts/diveSiteEvals/selectedDiveSiteContext"
import { DiveSite } from "../../entities/diveSite";
import style from './styles.module.scss';
import { MapContext } from "../googleMap/mapContext";
import { SelectedSeaLifeContext } from "../../contexts/seaLifeEvals/selectedSeaLifePhotoContext";
import { SitesArrayContext } from "../../contexts/sitesArrayContext";
import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";
// import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";
type DiveSiteListProps = {
    pendingDiveSitesList: DiveSite[] | null
  };

export default function DiveSiteListView(props: DiveSiteListProps) {
    const { setInitialPoint, mapRef } = useContext(MapContext);
    const { setSelectedPendingDiveSite } = useContext(SelectedPendingDiveSiteContext)
    const { setSelectedSeaLife } = useContext(SelectedSeaLifeContext)
    const { sitesArray, setSitesArray } = useContext(SitesArrayContext);
    const { setSelectedTripRequest } = useContext(SelectedTripRequestContext);
       
    const setupMap = (record: DiveSite) => {
        if(sitesArray.find(item => item.id === record.id)){
            // const index = sitesArray.findIndex(item => item.id === record.id)
            setSitesArray([])
            setSelectedPendingDiveSite(null)
            // sitesArray.splice(index, 1);  
        } else {
            setSitesArray([{id: record.id, lat: record.lat, lng: record.lng, name: record.name}])
            setSelectedPendingDiveSite(record)
        }

        setSelectedSeaLife(null)
        setSelectedTripRequest(null)
        setInitialPoint([record?.lat, record?.lng]);
 
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