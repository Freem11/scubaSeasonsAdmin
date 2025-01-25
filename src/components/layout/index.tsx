import { useState } from "react";
import { SeaLifePhotosContext } from "../../contexts/seaLifePhotosContext";
import { DiveSitesContext } from "../../contexts/diveSitesContext";
import { SeaLifePhoto } from "../../entities/seaLifePhoto";
import LayoutMainView from "./view";
import { DiveSite } from "../../entities/diveSite";


export default function LayoutMain() {
    const [photoRecords, setPhotoRecords] = useState<SeaLifePhoto[] | null>(null)
    const [diveSites, setDiveSites] = useState<DiveSite[] | null>(null)

return (
    <DiveSitesContext.Provider value={{ diveSites, setDiveSites }}>
    <SeaLifePhotosContext.Provider value={{ photoRecords, setPhotoRecords }}>
    <LayoutMainView/>
    </SeaLifePhotosContext.Provider>
    </DiveSitesContext.Provider>
)

}