import { useState } from "react";
import { SeaLifePhotosContext } from "../../contexts/seaLifeEvals/seaLifePhotosContext";
import { PendingDiveSitesContext } from "../../contexts/diveSiteEvals/diveSitesContext";
import { PartnerRequestsContext } from '../../contexts/partnerRequestEvals/partnerRequestsContext';
import { TripRequestsContext } from "../../contexts/tripRequestEvals/tripRequestContext";
import { SeaLifePhoto } from "../../entities/seaLifePhoto";
import LayoutMainView from "./view";
import { DiveSite } from "../../entities/diveSite";
import { DiveSiteContextProvider } from "../../contexts/diveSiteContextProvider";
import { PartnerRequest } from '../../entities/partnerRequest';
import { TripRequest } from "../../entities/tripRequest";

export default function LayoutMain() {
    const [photoRecords, setPhotoRecords] = useState<SeaLifePhoto[] | null>(null)
    const [pendingDiveSites, setPendingDiveSites] = useState<DiveSite[] | null>(null)
    const [partnerRequests, setPartnerRequests] = useState<PartnerRequest[] | null>(null)
    const [tripRequests, setTripRequests] = useState<TripRequest[] | null>(null)

return (
    <DiveSiteContextProvider>
        <PendingDiveSitesContext.Provider value={{ pendingDiveSites, setPendingDiveSites }}>
        <PartnerRequestsContext.Provider value={{ partnerRequests, setPartnerRequests }}>
        <SeaLifePhotosContext.Provider value={{ photoRecords, setPhotoRecords }}>
        <TripRequestsContext.Provider value={{ tripRequests, setTripRequests }}>
            <LayoutMainView/>
        </TripRequestsContext.Provider>
        </SeaLifePhotosContext.Provider>
    </PartnerRequestsContext.Provider>
        </PendingDiveSitesContext.Provider>
       
    </DiveSiteContextProvider>
)

}