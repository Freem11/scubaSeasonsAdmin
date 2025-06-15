import style from './styles.module.scss';
import { UserRequest } from '../../entities/userRequest';
// import { MapContext } from '../googleMap/mapContext';
// import { SelectedPendingDiveSiteContext } from '../../contexts/diveSiteEvals/selectedDiveSiteContext';
// import { SelectedSeaLifeContext } from '../../contexts/seaLifeEvals/selectedSeaLifePhotoContext';
// import { useContext } from 'react';
// import { SelectedPartnerRequestContext } from '../../contexts/partnerRequestEvals/selectedPartnerRequestContext';
// import { ShopsArrayContext } from '../../contexts/shopsArrayContext';
// import { SitesArrayContext } from '../../contexts/sitesArrayContext';


type DiveSiteFlagListProps = {
    diveSiteFlagsList: UserRequest[] | null;
};

export default function DiveSiteFlagListView(props: DiveSiteFlagListProps) {
    // const { setInitialPoint, mapRef } = useContext(MapContext);
    // const { setSelectedPartnerRequest } = useContext(SelectedPartnerRequestContext)
    // const { setSelectedSeaLife } = useContext(SelectedSeaLifeContext);
    // const { setSelectedPendingDiveSite } = useContext(
    //     SelectedPendingDiveSiteContext,
    // );
    // const { shopsArray, setShopsArray } = useContext(ShopsArrayContext);
    // const { setSitesArray } = useContext(SitesArrayContext);

    // const setupMap = (record: PartnerRequest) => {
    //     if (shopsArray.find((item) => item.id === record.id)) {
    //         // const index = shopsArray.findIndex(item => item.id === record.id)
    //         setShopsArray([]);
    //         setSelectedPartnerRequest(null);
    //         // shopsArray.splice(index, 1);
    //     } else {
    //         setShopsArray([
    //             {
    //                 id: record.id,
    //                 lat: record.latitude,
    //                 lng: record.longitude,
    //                 orgname: record.businessName,
    //             },
    //         ]);
    //         setSelectedPartnerRequest(record);
    //     }

    //     setSelectedSeaLife(null);
    //     setSelectedPendingDiveSite(null);
    //     setSitesArray([]);
    //     setInitialPoint([record?.latitude, record?.longitude]);

    //     mapRef?.panTo({ lat: record?.latitude, lng: record?.longitude });
    // };

    return (
        <div className="mt-4 flex-column">
            {props.diveSiteFlagsList &&
                props.diveSiteFlagsList.map((record: UserRequest) => {
                    return (
                        <div
                            className={style.cardMain}
                            key={record.id}
                            onClick={() => {}}
                        >
                            <div className="py-2">
                                <div>{record.entity_id}</div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
