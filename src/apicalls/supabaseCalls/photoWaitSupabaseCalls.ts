import { supabase } from "../supabase";

export const photoWaits = async () => {
  const { data, error } = await supabase
  .from("photoWait")
  .select();

  if (error || !data) {
    console.log("couldn't do it,", error);
    return [];
  }

  return data;
};

// export const insertPhotoWaits = async (values: any) => {
//   const { data, error } = await supabase
//   .from("photoWait")
//   .insert([
//     {
//       photoFile: values.PicFile,
//       label: values.Animal,
//       dateTaken: values.PicDate,
//       latitude: values.Latitude,
//       longitude: values.Longitude,
//       UserID: values.UserID
//     },
//   ]);

//   if (error || !data) {
//     console.log("couldn't do it,", error);
//   }

// };

export const grabPhotoWaitById = async (id: number) => {
  const { data, error } = await supabase
    .from("photoWait")
    .select()
    .eq("id", id)

  if (error || !data) {
    console.log("couldn't do it,", error);
    return [];
  }

  return data;
  
};

export const deletePhotoWait = async (id: number) => {

  const { data, error } = await supabase
    .from("photoWait")
    .delete()
    .eq("id", id);

  if (error || !data) {
    console.log("couldn't do it,", error);
    return [];
  }

};


export const getAllPhotoWaits = async () => {
  const { data, error } = await supabase.rpc('get_photowaits_with_user');

  if (error || !data) {
    console.log('couldn\'t do it Photo-Waits-All,', error);
    return [];
  }

  return data;

}