import { useContext, useEffect, useState } from "react";
import { insertHeatPoint } from "../../apicalls/supabaseCalls/heatPointSupabaseCalls";
import { insertphoto } from "../../apicalls/supabaseCalls/photoSupabaseCalls";
import revertedDate from "../../helpers/revertedDate";
import { removePhoto } from "../../apicalls/cloudflareBucketCalls/cloudflareAWSCalls";
import { getDiveSiteById } from "../../apicalls/supabaseCalls/diveSiteSupabaseCalls";
import { SelectedPendingReviewPhotoContext } from "../../contexts/reviewPhotoEvals/selectedReviewPhotoContext";
import { PendingReviewPhotosContext } from "../../contexts/reviewPhotoEvals/reviewPhotoContext";
import { deleteReviewPhoto, getAllReviewPhotosWithReviewInfo, updateDiveSitePhoto, updateWithDecision } from "../../apicalls/supabaseCalls/diveSiteReviewSupabaseCalls";
import ReviewPhotoEvalView from "./view";
import { DiveSite } from "../../entities/diveSite";
import { DynamicSelectOptionsAnimals } from "../../entities/DynamicSelectOptionsAnimals";
import { ReviewPhotoWithInfo } from "../../entities/reviewPhotoWithInfo";
import { Option } from "../../reusables/select";

export default function ReviewPhotoEval() {
  const { selectedReviewPhoto, setSelectedReviewPhoto } = useContext(SelectedPendingReviewPhotoContext)
  const { pendingReviewPhotos, setPendingReviewPhotos } = useContext(PendingReviewPhotosContext)
    
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


  const OkPhoto = async (reviewPhotoId: number) => {
      await updateWithDecision(reviewPhotoId, "Approved")
  }

  const RejectPhoto = async (reviewPhotoId: number) => {
      await removePhoto({ fileName: selectedReviewPhoto?.photoPath });
      await deleteReviewPhoto(reviewPhotoId);
      const photosToVett = await getAllReviewPhotosWithReviewInfo();
      setPendingReviewPhotos(photosToVett);
      setSelectedReviewPhoto(null)
  }

  const PromoteToHeader = async (reviewPhoto: ReviewPhotoWithInfo, divesite_id: number, photoPath: string) => {
      await updateDiveSitePhoto(divesite_id, photoPath, reviewPhoto.image_id)
      await updateWithDecision(reviewPhoto.id, "Header Photo")
      const photosToVett = await getAllReviewPhotosWithReviewInfo();
      setPendingReviewPhotos(photosToVett);
      setSelectedReviewPhoto(null)
};

const PromoteToSighting = async (reviewPhoto: ReviewPhotoWithInfo, diveSiteInfo: DiveSite, animalLabel: Option | undefined) => {
  console.log('reviewPhoto', reviewPhoto)
  console.log(reviewPhoto,diveSiteInfo, animalLabel )
  if(animalLabel) {
    const monthID = reviewPhoto.dive_date.slice(5, 7);
    const convertedDate = revertedDate(reviewPhoto.dive_date)
  
      await insertphoto({
        photoFile: reviewPhoto.photoPath,
        label: animalLabel.label,
        dateTaken: convertedDate,
        latitude: diveSiteInfo.lat,
        longitude: diveSiteInfo.lng,
        month: monthID,
        UserID: reviewPhoto.created_by,
        userName: null,
        image_id: reviewPhoto.image_id
      }, Number(monthID));
    
      await insertHeatPoint({
        lat: diveSiteInfo.lat,
        lng: diveSiteInfo.lng,
        animal: animalLabel.label,
        month: monthID,
        UserID: reviewPhoto.created_by,
        userName: null,
      });
  
      await updateWithDecision(reviewPhoto.id, "Sighting")
      const photosToVett = await getAllReviewPhotosWithReviewInfo();
      setPendingReviewPhotos(photosToVett);
      setSelectedReviewPhoto(null)
  }
};

        return (
          <ReviewPhotoEvalView 
            photoRecord={selectedReviewPhoto}
            diveSiteInfo={diveSite}
            getMoreAnimals={DynamicSelectOptionsAnimals.getMoreOptions}
            okPhoto={OkPhoto}
            rejectPhoto={RejectPhoto}
            headerPromote={PromoteToHeader}
            sightingPromote={PromoteToSighting}
          />

        )

}