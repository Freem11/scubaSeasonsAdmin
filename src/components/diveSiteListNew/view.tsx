import {useCallback, useContext, useEffect} from "react";

import { SitesArrayContext } from "../../contexts/sitesArrayContext";
import { ShopsArrayContext } from '../../contexts/shopsArrayContext';
import { MapContext } from "../googleMap/mapContext";
import { DiveSite } from "../../entities/diveSite";
import style from './styles.module.scss';
import { SelectedUnverifiedDiveSiteContext } from "../../contexts/unverifieddiveSiteEvals/selectedDiveSiteContext";

type UnverifiedDiveSiteListProps = {
    unverifiedDiveSitesList: DiveSite[] | null
  };

export default function UnverifiedDiveSiteListView(props: UnverifiedDiveSiteListProps) {
    const { setInitialPoint, mapRef } = useContext(MapContext);
    const { selectedUnverifiedDiveSite, setSelectedUnverifiedDiveSite } = useContext(SelectedUnverifiedDiveSiteContext)
    const { sitesArray, setSitesArray } = useContext(SitesArrayContext);
    const { setShopsArray } = useContext(ShopsArrayContext);

    const setupMap = useCallback((record: DiveSite) => {
        if(sitesArray.find(item => item.id === record.id)){
            // const index = sitesArray.findIndex(item => item.id === record.id)
            setSitesArray([])
            // sitesArray.splice(index, 1);
        } else {
            setSitesArray([{id: record.id, lat: record.lat, lng: record.lng, name: record.name}])
            setSelectedUnverifiedDiveSite(record)
        }

        setShopsArray([])
        setInitialPoint([record?.lat, record?.lng]);

        mapRef?.panTo({ lat: record?.lat, lng: record?.lng });
    }, [mapRef, setInitialPoint, setSelectedUnverifiedDiveSite, setShopsArray, setSitesArray, sitesArray]);

    useEffect(() => {
        if (props.unverifiedDiveSitesList && props.unverifiedDiveSitesList.length > 0 && !selectedUnverifiedDiveSite) {
            setupMap(props.unverifiedDiveSitesList[0]);
            setSelectedUnverifiedDiveSite(props.unverifiedDiveSitesList[0]);
        }
    }, [props.unverifiedDiveSitesList,  selectedUnverifiedDiveSite, setSelectedUnverifiedDiveSite, setupMap])

    return (
        <div className="mt-4 flex-column">
            {props.unverifiedDiveSitesList && props.unverifiedDiveSitesList.map((record: DiveSite) => {
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