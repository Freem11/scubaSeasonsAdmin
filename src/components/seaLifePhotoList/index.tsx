import { useEffect, useState } from "react";
import { getAllPhotoWaits } from "../../apicalls/supabaseCalls/photoWaitSupabaseCalls";
import SeaLifePhotoListView, { SeaLifePhoto } from "./view";

export default function SeaLifePhotoList() {
    const [photoRecords, setPhotoRecords] = useState<SeaLifePhoto[] | null>(null)

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