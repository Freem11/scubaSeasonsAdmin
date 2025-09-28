import { supabase } from "../supabase";

export const getAllReviewPhotosWithReviewInfo = async () => {
const { data, error } = await supabase.rpc('get_review_photos_for_vetting');

if (error) {
  console.log('couldn\'t do it Review-Photo-Vetting,', error);
  return [];
}

if (data) {
  return data;
}
}