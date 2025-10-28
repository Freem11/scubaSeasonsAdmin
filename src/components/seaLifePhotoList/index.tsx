import { useContext, useEffect } from "react";
import { getAllPhotoWaits } from "../../apicalls/supabaseCalls/photoWaitSupabaseCalls";
import { SeaLifePhotosContext } from "../../contexts/seaLifeEvals/seaLifePhotosContext";
import { PendingDiveSitesContext } from "../../contexts/diveSiteEvals/diveSitesContext";
import SeaLifePhotoListView from "./view";

export default function SeaLifePhotoList() {
    const {photoRecords, setPhotoRecords} = useContext(SeaLifePhotosContext)
    const { setPendingDiveSites } = useContext(PendingDiveSitesContext)

    useEffect(() => {
        getSeaLifePhotos()
    },[])

    const getSeaLifePhotos = async () => {
        setPendingDiveSites(null)
        try {
            const records = await getAllPhotoWaits();

            if (records) {
                setPhotoRecords(records);
            }
        } catch (e) {
            console.log({ title: 'Error', message: (e as Error).message });
        }
    };

    return (
        <SeaLifePhotoListView photoRecords={photoRecords} />
    )
}