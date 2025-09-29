import { useContext, useEffect, useState } from "react";
import { deletePhotoWait } from "../../apicalls/supabaseCalls/photoWaitSupabaseCalls";
import { insertHeatPoint } from "../../apicalls/supabaseCalls/heatPointSupabaseCalls";
import readableDate from "../../helpers/readableDate";
import { Form } from "./form";
import { insertphoto } from "../../apicalls/supabaseCalls/photoSupabaseCalls";
import revertedDate from "../../helpers/revertedDate";
import { removePhoto } from "../../apicalls/cloudflareBucketCalls/cloudflareAWSCalls";
import { getDiveSiteById, updateDiveSite } from "../../apicalls/supabaseCalls/diveSiteSupabaseCalls";
import { SelectedPendingReviewPhotoContext } from "../../contexts/reviewPhotoEvals/selectedReviewPhotoContext";
import { PendingReviewPhotosContext } from "../../contexts/reviewPhotoEvals/reviewPhotoContext";
import { getAllReviewPhotosWithReviewInfo } from "../../apicalls/supabaseCalls/diveSiteReviewSupabaseCalls";
import ReviewPhotoEvalView from "./view";
import { DiveSite } from "../../entities/diveSite";
import { DynamicSelectOptionsAnimals } from "../../entities/DynamicSelectOptionsAnimals";

export default function ReviewPhotoEval() {
  const { selectedReviewPhoto, setSelectedReviewPhoto } = useContext(SelectedPendingReviewPhotoContext)
  const { setPendingReviewPhotos } = useContext(PendingReviewPhotosContext)
    
  const [diveSite, setDiveSite] = useState<DiveSite | null>(null)

  useEffect(() => {
    if(selectedReviewPhoto?.divesite_id){
      getDiveSiteData(selectedReviewPhoto?.divesite_id);
    }

  }, [selectedReviewPhoto]);

  const getDiveSiteData = async(diveSite_id: number) => {
    const diveSiteData = await getDiveSiteById(diveSite_id)
      setDiveSite(diveSiteData[0])
  }

  // const ValidatePhoto = async (id: number | undefined, formData: Form) => {
  //   if (id && formData.date){
  //     const monthID = selectedSeaLife?.dateTaken.slice(5, 7);
  //     const convertedDate = revertedDate(formData.date)

  //     await insertHeatPoint({
  //       lat: formData.latitude,
  //       lng: formData.longitude,
  //       animal: formData.seaCreature,
  //       month: monthID,
  //       UserID: selectedSeaLife?.userid,
  //       userName: selectedSeaLife?.newusername,
  //     });

  //     await insertphoto({
  //       photoFile: selectedSeaLife?.photofile,
  //       label: formData.seaCreature,
  //       dateTaken: convertedDate,
  //       latitude: formData.latitude,
  //       longitude: formData.longitude,
  //       month: monthID,
  //       UserID: selectedSeaLife?.userid,
  //       userName: selectedSeaLife?.newusername,
  //     }, Number(monthID));

  //     await deletePhotoWait(id);
  //     const photosToVett = await getAllPhotoWaits();
  //     setPhotoRecords(photosToVett);
  //     setSelectedSeaLife(null)
  //   }
  // }

  // const RejectPhoto = async (id: number | undefined) => {
  //   if(id){
  //     await removePhoto({ filePath: selectedSeaLife?.label, fileName: selectedSeaLife?.photofile });
  //     await deletePhotoWait(id);
  //     const photosToVett = await getAllPhotoWaits();
  //     setPhotoRecords(photosToVett);
  //     setSelectedSeaLife(null)
  //   }
  // }

    const DiveSiteHeader = async (id: number | undefined, formData: Form) => {
      if(id){
        await updateDiveSite(formData.latitude,formData.longitude, selectedReviewPhoto?.photoPath)
        await deletePhotoWait(id);
        const photosToVett = await getAllReviewPhotosWithReviewInfo();
        setPendingReviewPhotos(photosToVett);
        setSelectedReviewPhoto(null)
      }
  };


  console.log('selectedReviewPhoto', selectedReviewPhoto)
  console.log('diveSite', diveSite)

        return (
            <ReviewPhotoEvalView 
            photoRecord={selectedReviewPhoto}
            diveSiteInfo={diveSite}
            diveSiteHeader={DiveSiteHeader}
            getMoreAnimals={DynamicSelectOptionsAnimals.getMoreOptions}
            />

        )

}