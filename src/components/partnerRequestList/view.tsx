import { useCallback, useContext, useEffect } from 'react';

import style from './styles.module.scss';
import { PartnerRequest } from '../../entities/partnerRequest';
import { MapContext } from '../googleMap/mapContext';
import { SelectedPartnerRequestContext } from '../../contexts/partnerRequestEvals/selectedPartnerRequestContext';
import { ShopsArrayContext } from '../../contexts/shopsArrayContext';
import { SitesArrayContext } from '../../contexts/sitesArrayContext';


type PartnerRequestListProps = {
    partnerRequestsList: PartnerRequest[] | null;
};

export default function PartnerRequestListView(props: PartnerRequestListProps) {
    const { setInitialPoint, mapRef } = useContext(MapContext);
    const { selectedPartnerRequest, setSelectedPartnerRequest } = useContext(SelectedPartnerRequestContext)
    const { setShopsArray } = useContext(ShopsArrayContext);
    const { setSitesArray } = useContext(SitesArrayContext);

    const setupMap = useCallback((record: PartnerRequest) => {
        setShopsArray([
            {
                id: record.id,
                lat: record.latitude,
                lng: record.longitude,
                orgname: record.businessName,
            },
        ]);

        setSelectedPartnerRequest(record);
        setSitesArray([]);
        setInitialPoint([record?.latitude, record?.longitude]);
        mapRef?.panTo({ lat: record?.latitude, lng: record?.longitude });
    }, [mapRef, setInitialPoint, setSelectedPartnerRequest, setShopsArray, setSitesArray]);

    useEffect(() => {
        if (props.partnerRequestsList && props.partnerRequestsList.length > 0 && !selectedPartnerRequest) {
            setupMap(props.partnerRequestsList[0]);
            setSelectedPartnerRequest(props.partnerRequestsList[0]);
        }
    }, [props.partnerRequestsList, selectedPartnerRequest, setSelectedPartnerRequest, setupMap]);

    return (
        <div className="mt-4 flex-column">
            {props.partnerRequestsList &&
                props.partnerRequestsList.map((record: PartnerRequest) => {
                    return (
                        <div
                            className={style.cardMain}
                            key={record.id}
                            onClick={() => setupMap(record)}
                        >
                            <div className="py-2">
                                <div>{record.businessName}</div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
