import { supabase } from '../supabase';

export const getAllItineraryRequest = async () => {
  const response = await supabase
  .from('itineraryRequests')
  .select()
  .is('deleted_at', null);

  if (response.error) {
    console.log('couldn\'t do it: itinerary edit/delete request,', response.error);
  }

  return response;
};

export const deleteItineraryRequest = async (id: number) => {
  const response = await supabase
  .from('itineraryRequests')
  .update({
    deleted_at: new Date(),
  })
  .eq('id',id);

  if (response.error) {
    console.log('couldn\'t do it: itinerary edit/delete request,', response.error);
  }
 
  return {data: response.data, error: response.error};
};

export const approvedItineraryRequest = async (id: number, userId?: string) => {
  const response = await supabase
  .from('itineraryRequests')
  .update({
    updated_at: new Date(),
    approved: true,
    approved_by: userId, 
  })
  .eq('id',id);

  if (response.error) {
    console.log('couldn\'t do it: itinerary edit/delete request,', response.error);
  }
 
  return {data: response.data, error: response.error};
}
