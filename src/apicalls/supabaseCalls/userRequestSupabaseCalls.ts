import { supabase } from "../supabase";

export const getDiveSiteFlags = async () => {
  const response = await supabase
  .from('user_requests')
  .select()
  .eq('entity', 'dive_site');

  if (response.error) {
    console.log('couldn\'t do it: dive site flag retrieve request,', response.error);
  }

  console.log(response);
  return response;
};