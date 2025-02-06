import { supabase } from "../supabase";

// export const partnerRequests = async () => {
//   const { data, error } = await supabase
//   .from("partnerAccountRequests")
//   .select()
//   .is('validated', null)

//   if (error) {
//     console.log("couldn't do it 1,", error);
//     return [];
//   }

//   if (data) {
//     return data;
//   }
// };

export const partnerRequests = async () => {
  const { data, error } = await supabase.rpc("get_partnerrequests_with_useremail");

  if (error) {
    console.log("couldn't do it 52,", error);
    return [];
  }

  if (data) {
    return { data, error };
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

export const insertNewShop = async (businessName: string, lat: number, lng: number, id: string) => {
  const { data, error } = await supabase.from("shops").insert([
    {
      orgName: businessName,
      lat: lat,
      lng: lng,
      userId: id
    },
  ]);

  if (error) {
    console.log("couldn't do it 4,", error);
  }

  if (data) {
    console.log(data);
  }
};