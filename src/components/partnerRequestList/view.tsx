import { useContext } from "react";
import { SelectedPartnerRequestContext } from "../../contexts/partnerRequestEvals/selectedPartnerRequestContext"
import style from './styles.module.scss';
import { MapContext } from "../googleMap/mapContext";
import { SelectedSeaLifeContext } from "../../contexts/seaLifeEvals/selectedSeaLifePhotoContext";
import { SitesArrayContext } from "../../contexts/sitesArrayContext";
import { PartnerRequest } from '../../entities/partnerRequest';

type PartnerRequestListProps = {
    partnerRequestsList: PartnerRequest[] | null
  };

export default function PartnerRequestListView(props: PartnerRequestListProps) {
    const { setInitialPoint, mapRef } = useContext(MapContext);
    const { setSelectedPartnerRequest } = useContext(SelectedPartnerRequestContext)
    const { setSelectedSeaLife } = useContext(SelectedSeaLifeContext)
    const { sitesArray, setSitesArray } = useContext(SitesArrayContext);

    const setupMap = (record: PartnerRequest) => {
        if(sitesArray.find(item => item.id === record.id)){
            // const index = sitesArray.findIndex(item => item.id === record.id)
            setSitesArray([])
            setSelectedPartnerRequest(null)
            // sitesArray.splice(index, 1);  
        } else {
            setSitesArray([{id: record.id, lat: record.latitude, lng: record.longitude, name: record.businessName}])
            setSelectedPartnerRequest(record)
        }

        setSelectedSeaLife(null)
        setInitialPoint([record?.latitude, record?.longitude]);
 
        mapRef?.panTo({ lat: record?.latitude, lng: record?.longitude });
    };

return (
    <div className="mt-4 flex-column">
    {props.partnerRequestsList && props.partnerRequestsList.map((record: PartnerRequest) => {
        return (
        <div className={style.cardMain} key={record.id} onClick={() => setupMap(record)}>
            <div className='py-2'>
                <div>{record.businessName}</div> 
            </div>
        </div>
    )
    })}
</div>
)
}