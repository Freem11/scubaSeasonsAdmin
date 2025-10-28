import { createContext } from "react";
import { ReviewPhotoWithInfo } from "../../entities/reviewPhotoWithInfo";

type SelectedPendingReviewPhotoContextType = {
  selectedReviewPhoto: ReviewPhotoWithInfo | null;
  setSelectedReviewPhoto: React.Dispatch<React.SetStateAction<ReviewPhotoWithInfo | null>>;
};

export const SelectedPendingReviewPhotoContext = createContext<SelectedPendingReviewPhotoContextType>({} as SelectedPendingReviewPhotoContextType);
