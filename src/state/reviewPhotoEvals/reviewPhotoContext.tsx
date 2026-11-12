import { createContext } from "react";
import { ReviewPhotoWithInfo } from "../../shared/entities/reviewPhotoWithInfo";

type PendingReviewPhotosContextType = {
  pendingReviewPhotos: ReviewPhotoWithInfo[] | null;
  setPendingReviewPhotos: React.Dispatch<React.SetStateAction<ReviewPhotoWithInfo[] | null>>;
};

export const PendingReviewPhotosContext = createContext<PendingReviewPhotosContextType>({} as PendingReviewPhotosContextType);
