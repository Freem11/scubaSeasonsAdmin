import { supabase } from '../supabase';
import { ItineraryItem } from '../entities/itineraryItem';


export const getAllItineraryRequest = async () => {
  const { data, error } = await supabase
  .from('itineraryRequests')
  .select();

  if (error) {
    console.log('couldn\'t do it: itinerary edit/delete request,', error);
  }
  return { data, error };
};
