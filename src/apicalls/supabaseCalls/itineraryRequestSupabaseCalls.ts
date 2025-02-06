import { supabase } from '../supabase';

export const getAllItineraryRequest = async () => {
  const { data, error } = await supabase
  .from('itineraryRequests')
  .select();

  if (error) {
    console.log('couldn\'t do it: itinerary edit/delete request,', error);
  }
  if (data) {
    return {data, error};
  }
};
