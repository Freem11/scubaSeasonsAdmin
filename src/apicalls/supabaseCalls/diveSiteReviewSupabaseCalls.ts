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


export const updateWithDecision = async (id: number, decision: string) => {

  const { data, error } = await supabase
  .from('diveSiteReviewPhotos')
  .update({ decision: decision})
  .eq('id', id)

  if (error) {
    console.log('couldn\'t do it REVIEW_PHOTO_APPROVAL,', error);
    return [];
  }

  if (data) {
    return data;
  }
  }


export const deleteReviewPhoto = async (id: number) => {

  const { data, error } = await supabase
    .from("diveSiteReviewPhotos")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("couldn't do it DELETE_REVIEW_PHOTO,", error);
    return [];
  }

  if (data) {
    console.log(data);
  }
};


  export const updateDiveSitePhoto = async (id: number, photoFile: string) => {

  const { data, error } = await supabase
    .from('diveSites')
    .update({ "diveSiteProfilePhoto": photoFile })
    .eq("id", id);

  if (error) {
    console.log('couldn\'t do it DIVE_SITE_HEADER_PHOTO,', error);
    return [];
  }

  if (data) {
    return data;
  }
  };