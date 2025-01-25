import { useContext, useEffect } from "react";
import { getAllPhotoWaits } from "../../apicalls/supabaseCalls/photoWaitSupabaseCalls";
import SeaLifePhotoListView from "./view";
import { SeaLifePhotosContext } from "../../contexts/seaLifePhotosContext";
import { DiveSitesContext } from "../../contexts/diveSitesContext";

export default function SeaLifePhotoLis() {
    const {photoRecords, setPhotoRecords} = useContext(SeaLifePhotosContext)
    const { setDiveSites } = useContext(DiveSitesContext)
    useEffect(() => {
        getSeaLifePhotos()
    },[])

    const getSeaLifePhotos = async () => {
      setDiveSites(null)
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
    <SeaLifePhotoListView photoRecords={photoRecords}/>

)

}