import { useContext, useEffect } from "react";
import { getAllPhotoWaits } from "../../apicalls/supabaseCalls/photoWaitSupabaseCalls";
import SeaLifePhotoListView from "./view";
import { SeaLifePhotosContext } from "../../contexts/seaLifePhotosContext";

export default function SeaLifePhotoLis() {
    const {photoRecords, setPhotoRecords} = useContext(SeaLifePhotosContext)

    useEffect(() => {
        getSeaLifePhotos()
    },[])

    const getSeaLifePhotos = async () => {
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