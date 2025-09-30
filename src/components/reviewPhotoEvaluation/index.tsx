import { useContext, useEffect, useState } from "react";
import { deletePhotoWait } from "../../apicalls/supabaseCalls/photoWaitSupabaseCalls";
import { insertHeatPoint } from "../../apicalls/supabaseCalls/heatPointSupabaseCalls";
import readableDate from "../../helpers/readableDate";
import { Form } from "./form";
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
    if(reviewPhotoId){
      await removePhoto({ fileName: selectedReviewPhoto?.photoPath });
      await deleteReviewPhoto(reviewPhotoId);
      const photosToVett = await getAllReviewPhotosWithReviewInfo();
      setPendingReviewPhotos(photosToVett);
      setSelectedReviewPhoto(null)
    }
  }

  const PromoteToHeader = async (reviewPhotoId: number, photoPath: string) => {
    if(reviewPhotoId){
      await updateDiveSitePhoto(reviewPhotoId, photoPath)
      await updateWithDecision(reviewPhotoId, "Header Photo")
      const photosToVett = await getAllReviewPhotosWithReviewInfo();
      setPendingReviewPhotos(photosToVett);
      setSelectedReviewPhoto(null)
    }
};

const PromoteToSighting = async (reviewPhotoId: number, photoPath: string) => {
  // if(reviewPhotoId){
  //   await updateDiveSitePhoto(reviewPhotoId, photoPath)
  //   await updateWithDecision(reviewPhotoId, "Header Photo")
  //   const photosToVett = await getAllReviewPhotosWithReviewInfo();
  //   setPendingReviewPhotos(photosToVett);
  //   setSelectedReviewPhoto(null)
  // }
};




  console.log('selectedReviewPhoto', selectedReviewPhoto)
  console.log('diveSite', diveSite)

        return (
            <ReviewPhotoEvalView 
            photoRecord={selectedReviewPhoto}
            diveSiteInfo={diveSite}
            diveSiteHeader={DiveSiteHeader}
            getMoreAnimals={DynamicSelectOptionsAnimals.getMoreOptions}
            okPhoto={OkPhoto}
            rejectPhoto={RejectPhoto}
            headerPromote={PromoteToHeader}
            />

        )

}