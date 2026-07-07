import {useCallback, useContext, useEffect} from "react";

import { SelectedPendingDiveSiteContext } from "../../contexts/diveSiteEvals/selectedDiveSiteContext"
import { SitesArrayContext } from "../../contexts/sitesArrayContext";
import { ShopsArrayContext } from '../../contexts/shopsArrayContext';
import { MapContext } from "../googleMap/mapContext";
import { DiveSite } from "../../entities/diveSite";
import style from './styles.module.scss';

type DiveSiteListProps = {
    pendingDiveSitesList: DiveSite[] | null
  };

export default function DiveSiteListView(props: DiveSiteListProps) {
    const { setInitialPoint, mapRef } = useContext(MapContext);
    const { selectedPendingDiveSite, setSelectedPendingDiveSite } = useContext(SelectedPendingDiveSiteContext)
    const { sitesArray, setSitesArray } = useContext(SitesArrayContext);
    const { setShopsArray } = useContext(ShopsArrayContext);

    const setupMap = useCallback((record: DiveSite) => {
        if(sitesArray.find(item => item.id === record.id)){
            // const index = sitesArray.findIndex(item => item.id === record.id)
            setSitesArray([])
            // sitesArray.splice(index, 1);
        } else {
            setSitesArray([{id: record.id, lat: record.lat, lng: record.lng, name: record.name}])
            setSelectedPendingDiveSite(record)
        }

        setShopsArray([])
        setInitialPoint([record?.lat, record?.lng]);

        mapRef?.panTo({ lat: record?.lat, lng: record?.lng });
    }, [mapRef, setInitialPoint, setSelectedPendingDiveSite, setShopsArray, setSitesArray, sitesArray]);

    useEffect(() => {
        if (props.pendingDiveSitesList && props.pendingDiveSitesList.length > 0 && !selectedPendingDiveSite) {
            setupMap(props.pendingDiveSitesList[0]);
            setSelectedPendingDiveSite(props.pendingDiveSitesList[0]);
        }
    }, [props.pendingDiveSitesList, selectedPendingDiveSite, setSelectedPendingDiveSite, setupMap])

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