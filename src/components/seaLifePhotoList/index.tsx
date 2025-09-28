import { useContext, useEffect } from "react";
import { getAllPhotoWaits } from "../../apicalls/supabaseCalls/photoWaitSupabaseCalls";
import SeaLifePhotoListView from "./view";
import { SeaLifePhotosContext } from "../../contexts/seaLifeEvals/seaLifePhotosContext";

export default function SeaLifePhotoList() {
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

      console.log('photoRecords', photoRecords)
    
return (
    <SeaLifePhotoListView photoRecords={photoRecords}/>

)

}