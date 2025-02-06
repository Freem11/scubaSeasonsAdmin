import { supabase } from '../supabase';

export const getAllItineraryRequest = async () => {
  const response = await supabase
  .from('itineraryRequests')
  .select();

  if (response.error) {
    console.log('couldn\'t do it: itinerary edit/delete request,', error);
  }
 
  return response;
  //edit --> save record to table 
};
