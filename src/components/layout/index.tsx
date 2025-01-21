import { useState } from "react";
import { SeaLifePhotosContext } from "../../contexts/seaLifePhotosContext";
import { SeaLifePhoto } from "../seaLifePhotoList/view";
import LayoutMainView from "./view";

export default function LayoutMain() {
    const [photoRecords, setPhotoRecords] = useState<SeaLifePhoto[] | null>(null)

return (
    <SeaLifePhotosContext.Provider value={{ photoRecords, setPhotoRecords }}>
    <LayoutMainView/>
    </SeaLifePhotosContext.Provider>
)

}