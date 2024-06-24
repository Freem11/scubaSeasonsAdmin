import { supabase } from "../supabase";

export const partnerRequests = async () => {
  const { data, error } = await supabase
  .from("partnerAccountRequests")
  .select()
  .is('validated', null)

  if (error) {
    console.log("couldn't do it,", error);
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
    console.log("couldn't do it,", error);
    return [];
  }
};
