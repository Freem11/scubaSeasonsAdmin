import { useContext } from "react";
import { SelectedPendingDiveShopContext } from "../../contexts/diveShopEvals/selectedDiveShopContext"
import { DiveShop } from "../../entities/diveShop";
import style from './styles.module.scss';
import { MapContext } from "../googleMap/mapContext";
import { SelectedSeaLifeContext } from "../../contexts/seaLifeEvals/selectedSeaLifePhotoContext";
import { SitesArrayContext } from "../../contexts/sitesArrayContext";

type PartnerRequestListProps = {
    pendingDiveShopsList: DiveShop[] | null
  };

export default function PartnerRequestListView(props: PartnerRequestListProps) {
    const { setInitialPoint, mapRef } = useContext(MapContext);
    const { setSelectedPendingDiveShop } = useContext(SelectedPendingDiveShopContext)
    const { setSelectedSeaLife } = useContext(SelectedSeaLifeContext)
    const { sitesArray, setSitesArray } = useContext(SitesArrayContext);

    const setupMap = (record: DiveShop) => {
        if(sitesArray.find(item => item.id === record.id)){
            // const index = sitesArray.findIndex(item => item.id === record.id)
            setSitesArray([])
            setSelectedPendingDiveShop(null)
            // sitesArray.splice(index, 1);  
        } else {
            setSitesArray([{id: record.id, lat: record.lat, lng: record.lng, name: record.orgname}])
            setSelectedPendingDiveShop(record)
        }

        setSelectedSeaLife(null)
        setInitialPoint([record?.lat, record?.lng]);
 
        mapRef?.panTo({ lat: record?.lat, lng: record?.lng });
    };

return (
    <div className="mt-4 flex-column">
    {props.pendingDiveShopsList && props.pendingDiveShopsList.map((record: DiveShop) => {
        return (
        <div className={style.cardMain} key={record.id} onClick={() => setupMap(record)}>
            <div className='py-2'>
                <div>{record.orgname}</div> 
            </div>
        </div>
    )
    })}
</div>
)
}