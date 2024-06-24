import { supabase } from "../supabase";

export const partnerRequests = async () => {
  const { data, error } = await supabase
  .from("partnerAccountRequests")
  .select()
  .is('validated', null)

  if (error) {
    console.log("couldn't do it 1,", error);
    return [];
  }

  if (data) {
    return data;
  }
};

export const updatePartnerRequestByUserId= async (userID : string, decision : boolean) => {
  const { error } = await supabase
  .from('partnerAccountRequests')
  .update({ 'validated' : decision })
  .eq('userId', userID)

  if (error) {
    console.log("couldn't do it 2,", error);
    return [];
  }
};

export const updateProfileByUserId= async (userID : string, decision : boolean) => {
  const { error } = await supabase
  .from('UserProfiles')
  .update({ 'partnerAccount' : decision })
  .eq('UserID', userID)

  if (error) {
    console.log("couldn't do it 3,", error);
    return [];
  }
};

export const insertNewShop = async (businessName: string, lat: number, lng: number) => {
  const { data, error } = await supabase.from("shops").insert([
    {
      orgName: businessName,
      lat: lat,
      lng: lng,
    },
  ]);

  if (error) {
    console.log("couldn't do it 4,", error);
  }

  if (data) {
    console.log(data);
  }
};