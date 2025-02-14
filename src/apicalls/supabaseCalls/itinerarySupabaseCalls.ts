
import { supabase } from '../supabase';

export const getItineraryByIdRequest = async (id: number) => {
  const response = await supabase
  .from('itineraries')
  .select()
  .eq('id',id);

  if (response.error) {
    console.log('couldn\'t do it: get one itinerary request,', response.error);
  }
 
  return response;
  //edit --> save record to table 
};
