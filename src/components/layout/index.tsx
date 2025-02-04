import { useState } from "react";
import { SeaLifePhotosContext } from "../../contexts/seaLifeEvals/seaLifePhotosContext";
import { PendingDiveSitesContext } from "../../contexts/diveSiteEvals/diveSitesContext";
import { PartnerRequestsContext } from '../../contexts/partnerRequestEvals/partnerRequestsContext';
import { SeaLifePhoto } from "../../entities/seaLifePhoto";
import LayoutMainView from "./view";
import { DiveSite } from "../../entities/diveSite";
import { DiveSiteContextProvider } from "../../contexts/diveSiteContextProvider";
import { PartnerRequest } from '../../entities/partnerRequest';

export default function LayoutMain() {
    const [photoRecords, setPhotoRecords] = useState<SeaLifePhoto[] | null>(null)
    const [pendingDiveSites, setPendingDiveSites] = useState<DiveSite[] | null>(null)
    const [partnerRequests, setPartnerRequests] = useState<PartnerRequest[] | null>(null)


return (
    <DiveSiteContextProvider>
    <PendingDiveSitesContext.Provider value={{ pendingDiveSites, setPendingDiveSites }}>
    <PartnerRequestsContext.Provider value={{ partnerRequests, setPartnerRequests }}>
    <SeaLifePhotosContext.Provider value={{ photoRecords, setPhotoRecords }}>
    <LayoutMainView/>
    </SeaLifePhotosContext.Provider>
    </PartnerRequestsContext.Provider>
    </PendingDiveSitesContext.Provider>
    </DiveSiteContextProvider>
)

}