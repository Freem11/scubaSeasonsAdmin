import { supabase } from "../supabase";

export const photoWaits = async () => {
  const { data, error } = await supabase
  .from("photoWait")
  .select();

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

/** The form values of a new sea-life photo, typed by the columns the insert writes. No caller in this repo. */
type PhotoWaitInsert = {
  PicFile:   string
  Animal:    string
  PicDate:   string
  Latitude:  number
  Longitude: number
  UserID:    string
};

export const insertPhotoWaits = async (values: PhotoWaitInsert) => {
  const { data, error } = await supabase
  .from("photoWait")
  .insert([
    {
      photoFile: values.PicFile,
      label: values.Animal,
      dateTaken: values.PicDate,
      latitude: values.Latitude,
      longitude: values.Longitude,
      UserID: values.UserID
    },
  ]);

  if (error) {
    console.log("couldn't do it,", error);
  }

  if (data) {
    console.log(data);
  }
};

export const grabPhotoWaitById = async (id: number) => {
  const { data, error } = await supabase
    .from("photoWait")
    .select()
    .eq("id", id)

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const deletePhotoWait = async (id: number) => {

  const { data, error } = await supabase
    .from("photoWait")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    console.log(data);
  }
};


export const getAllPhotoWaits = async () => {
const { data, error } = await supabase.rpc('get_photowaits_with_user');

if (error) {
  console.log('couldn\'t do it Photo-Waits-All,', error);
  return [];
}

if (data) {
  return data;
}
}