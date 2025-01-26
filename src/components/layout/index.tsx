import { useState } from "react";
import { SeaLifePhotosContext } from "../../contexts/seaLifeEvals/seaLifePhotosContext";
import { PendingDiveSitesContext } from "../../contexts/diveSiteEvals/diveSitesContext";
import { SeaLifePhoto } from "../../entities/seaLifePhoto";
import LayoutMainView from "./view";
import { DiveSite } from "../../entities/diveSite";
import { DiveSiteContextProvider } from "../../contexts/diveSiteContextProvider";

export default function LayoutMain() {
    const [photoRecords, setPhotoRecords] = useState<SeaLifePhoto[] | null>(null)
    const [pendingDiveSites, setPendingDiveSites] = useState<DiveSite[] | null>(null)


return (
    <DiveSiteContextProvider>
    <PendingDiveSitesContext.Provider value={{ pendingDiveSites, setPendingDiveSites }}>
    <SeaLifePhotosContext.Provider value={{ photoRecords, setPhotoRecords }}>
    <LayoutMainView/>
    </SeaLifePhotosContext.Provider>
    </PendingDiveSitesContext.Provider>
    </DiveSiteContextProvider>
)

}