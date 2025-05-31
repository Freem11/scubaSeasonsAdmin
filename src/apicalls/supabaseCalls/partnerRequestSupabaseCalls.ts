import { PartnerRequest } from '../../entities/partnerRequest';
import { supabase } from "../supabase";

export const partnerRequests = async () => {
  const response = await supabase.rpc("get_partnerrequests_with_useremail");

  if (response.error) {
    console.log("couldn't do it 52,", response.error);
  }

  return response;
};

export const grabPartnerRequestById = async (id: number): Promise<PartnerRequest> => {
  const response = await supabase
    .from("partnerAccountRequests")
    .select()
    .eq("id", id)
    .single();

  if (response.error) {
    console.log("couldn't do it,", response.error);
  } else if (response.data) {
    return response.data as PartnerRequest;
  }
  
  throw new Error("[grabPartnerRequestById]:Smth went Wrong")
};

export const insertNewShop = async (values: any) => {
  const { data, error } = await supabase.from("shops").insert([
    {
      orgName: values.businessName,
      lat: values.latitude,
      lng: values.longitude,
      userId: values.userId
    },
  ]);

  if (error) {
    console.log("couldn't do it 4,", error);
  }

  if (data) {
    console.log(data);
  }
};

export const updateValidatePartnerRequestByUserId= async (userID : string, decision : boolean) => {
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

export const deletePartnerRequest = async (id: number) => {

  const { data, error } = await supabase
  .from("partnerAccountRequests")
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
