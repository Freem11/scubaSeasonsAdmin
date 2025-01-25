import { supabase } from "../supabase";

export const diveSiteWaits = async () => {

  const { data, error } = await supabase
  .from("diveSiteWait")
  .select();

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const insertDiveSiteWaits = async (values: any) => {
  console.log("Supa got", values)
  const { data, error } = await supabase
  .from("diveSiteWait")
  .insert([
    {
      name: values.Site,
      lat: values.Latitude,
      lng: values.Longitude,
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

export const grabDiveSiteWaitById = async (id: number) => {

  const { data, error } = await supabase
    .from("diveSiteWait")
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

export const deleteDiveSiteWait = async (id: number) => {

  const { data, error } = await supabase
  .from("diveSiteWait")
  .delete()
  .eq("id", id);

if (error) {
  console.log("couldn't do it,", error);
  return [];
}

if (data) {
  console.log(data);
}
}


export const getAllDiveSiteWaits = async () => {
  const { data, error } = await supabase.rpc('get_divesitewaits_with_user');
  
  if (error) {
    console.log('couldn\'t do it DiveSite-Waits-All,', error);
    return [];
  }
  
  if (data) {
    return data;
  }
  }

