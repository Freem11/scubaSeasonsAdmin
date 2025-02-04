import { supabase } from "../supabase";

export const diveShopWaits = async () => {

  const { data, error } = await supabase
  .from("diveShopWait")
  .select();

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const insertDiveShopWaits = async (values: any) => {
  console.log("Supa got", values)
  const { data, error } = await supabase
  .from("diveShopWait")
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

export const grabDiveShopWaitById = async (id: number) => {

  const { data, error } = await supabase
    .from("diveShopWait")
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

export const deleteDiveShopWait = async (id: number) => {

  const { data, error } = await supabase
  .from("diveShopWait")
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


export const getAllDiveShopWaits = async () => {
  const { data, error } = await supabase.rpc('get_diveshopwaits_with_user');
  
  if (error) {
    console.log('couldn\'t do it DiveShop-Waits-All,', error);
    return [];
  }
  
  if (data) {
    return data;
  }
  }

