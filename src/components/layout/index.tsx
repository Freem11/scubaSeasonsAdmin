import { useState } from "react";
import { SeaLifePhotosContext } from "../../contexts/seaLifeEvals/seaLifePhotosContext";
import { PendingDiveSitesContext } from "../../contexts/diveSiteEvals/diveSitesContext";
import { TripRequestsContext } from "../../contexts/tripRequestEvals/tripRequestContext";
import { SeaLifePhoto } from "../../entities/seaLifePhoto";
import LayoutMainView from "./view";
import { DiveSite } from "../../entities/diveSite";
import { DiveSiteContextProvider } from "../../contexts/diveSiteContextProvider";
import { TripRequest } from "../../entities/tripRequest";

export default function LayoutMain() {
    const [photoRecords, setPhotoRecords] = useState<SeaLifePhoto[] | null>(null)
    const [pendingDiveSites, setPendingDiveSites] = useState<DiveSite[] | null>(null)
    const [tripRequests, setTripRequests] = useState<TripRequest[] | []>([])

return (
    <DiveSiteContextProvider>
        <PendingDiveSitesContext.Provider value={{ pendingDiveSites, setPendingDiveSites }}>
        <SeaLifePhotosContext.Provider value={{ photoRecords, setPhotoRecords }}>
        <TripRequestsContext.Provider value={{ tripRequests, setTripRequests }}>
            <LayoutMainView/>
        </TripRequestsContext.Provider>
        </SeaLifePhotosContext.Provider>
        </PendingDiveSitesContext.Provider>
       
    </DiveSiteContextProvider>
)

}