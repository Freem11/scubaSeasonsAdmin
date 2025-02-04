import { useState } from "react";
import { SeaLifePhotosContext } from "../../contexts/seaLifeEvals/seaLifePhotosContext";
import { PendingDiveSitesContext } from "../../contexts/diveSiteEvals/diveSitesContext";
import { PendingDiveShopsContext } from '../../contexts/diveShopEvals/diveShopsContext';
import { SeaLifePhoto } from "../../entities/seaLifePhoto";
import LayoutMainView from "./view";
import { DiveSite } from "../../entities/diveSite";
import { DiveSiteContextProvider } from "../../contexts/diveSiteContextProvider";
import { DiveShop } from '../../entities/diveShop';

export default function LayoutMain() {
    const [photoRecords, setPhotoRecords] = useState<SeaLifePhoto[] | null>(null)
    const [pendingDiveSites, setPendingDiveSites] = useState<DiveSite[] | null>(null)
    const [pendingDiveShops, setPendingDiveShops] = useState<DiveShop[] | null>(null)


return (
    <DiveSiteContextProvider>
    <PendingDiveSitesContext.Provider value={{ pendingDiveSites, setPendingDiveSites }}>
    <PendingDiveShopsContext.Provider value={{ pendingDiveShops, setPendingDiveShops }}>
    <SeaLifePhotosContext.Provider value={{ photoRecords, setPhotoRecords }}>
    <LayoutMainView/>
    </SeaLifePhotosContext.Provider>
    </PendingDiveShopsContext.Provider>
    </PendingDiveSitesContext.Provider>
    </DiveSiteContextProvider>
)

}