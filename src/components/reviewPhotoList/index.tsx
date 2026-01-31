import { useContext, useEffect } from "react";
import ReveiwPhotoListView from "./view";
import { getAllReviewPhotosWithReviewInfo } from "../../apicalls/supabaseCalls/diveSiteReviewSupabaseCalls";
import { PendingReviewPhotosContext } from "../../contexts/reviewPhotoEvals/reviewPhotoContext";

export default function ReviewPhotoList() {
    const {pendingReviewPhotos, setPendingReviewPhotos} = useContext(PendingReviewPhotosContext)
    
    useEffect(() => {
      getReviewPhotos()
    },[])

    const getReviewPhotos = async () => {
        try {
          const records = await getAllReviewPhotosWithReviewInfo();
          if (records) {
            setPendingReviewPhotos(records);
          }
        } catch (e) {
          console.log({ title: 'Error', message: (e as Error).message });
        }
      };

      console.log('pendingReviewPhotos', pendingReviewPhotos)
    
return (
    <ReveiwPhotoListView photoRecords={pendingReviewPhotos}/>

)

}