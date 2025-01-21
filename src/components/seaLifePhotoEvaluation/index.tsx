import { useContext } from "react";
import { SelectedSeaLifeContext } from "../../contexts/selectSeaLifePhotoContext";
import SeaLifePhotoEvalView from "./view";
import { deletePhotoWait, getAllPhotoWaits } from "../../apicalls/supabaseCalls/photoWaitSupabaseCalls";
import { insertHeatPoint } from "../../apicalls/supabaseCalls/heatPointSupabaseCalls";
import readableDate from "../../helpers/readableDate";
import { Form } from "./form";
import { insertphoto } from "../../apicalls/supabaseCalls/photoSupabaseCalls";
import { SeaLifePhotosContext } from "../../contexts/seaLifePhotosContext";
import revertedDate from "../../helpers/revertedDate";
import { removePhoto } from "../../apicalls/cloudflareBucketCalls/cloudflareAWSCalls";

export default function SeaLifePhotoEval() {
  const { selectedSeaLife, setSelectedSeaLife } = useContext(SelectedSeaLifeContext)
  const { setPhotoRecords } = useContext(SeaLifePhotosContext)
    
  const ValidatePhoto = async (id: number | undefined, formData: Form) => {
    if (id){
      const monthID = selectedSeaLife?.dateTaken.slice(5, 7);
      const convertedDate = revertedDate(formData.date)

      await insertHeatPoint({
        lat: formData.latitude,
        lng: formData.longitude,
        animal: formData.seaCreature,
        month: monthID,
        UserID: selectedSeaLife?.userid,
        userName: selectedSeaLife?.newusername,
      });

      await insertphoto({
        photoFile: selectedSeaLife?.photofile,
        label: formData.seaCreature,
        dateTaken: convertedDate,
        latitude: formData.latitude,
        longitude: formData.longitude,
        month: monthID,
        UserID: selectedSeaLife?.userid,
        userName: selectedSeaLife?.newusername,
      }, Number(monthID));

      await deletePhotoWait(id);
      const photosToVett = await getAllPhotoWaits();
      setPhotoRecords(photosToVett);
      setSelectedSeaLife(null)
    }
  }

  const RejectPhoto = async (id: number | undefined) => {
    if(id){
      await removePhoto({ filePath: selectedSeaLife?.label, fileName: selectedSeaLife?.photofile });
      await deletePhotoWait(id);
      const photosToVett = await getAllPhotoWaits();
      setPhotoRecords(photosToVett);
      setSelectedSeaLife(null)
    }
  
  };

        return (
            <SeaLifePhotoEvalView 
            photoRecord={selectedSeaLife}
            validatePhoto={ValidatePhoto}
            rejectPhoto={RejectPhoto}
            values={{
              seaCreature: selectedSeaLife?.label,
              latitude: selectedSeaLife?.latitude,
              longitude: selectedSeaLife?.longitude,
              date: selectedSeaLife?.dateTaken && readableDate(selectedSeaLife?.dateTaken)
            }}
            />

        )

}