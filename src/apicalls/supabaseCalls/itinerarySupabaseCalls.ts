
import { TripRequest } from '../../entities/tripRequest';
import { supabase } from '../supabase';


export const getTripRequests = async () => {
  const response = await supabase
  .from('itineraries')
  .select();
  
  return response;
}
export const getItineraryByIdRequest = async (id: number) => {
  const response = await supabase
  .from('itineraries')
  .select()
  .eq('id',id)
  .is('deleted_at', null);

  if (response.error) {
    console.log('couldn\'t do it: get one itinerary request,', response.error);
  }
 
  return response.data as TripRequest[];
};

/**
 * The itinerary fields updateItinerary and deleteItinerary read. The caller builds the object from an
 * all-optional form, so every field can be undefined. It also passes created_at (a Date) and deleted_at;
 * updateItinerary does not read them.
 */
type ItineraryChange = Partial<Omit<TripRequest, 'created_at'>> & {
  created_at?: string | Date
  deleted_at?: null
};

export const updateItinerary = async (itinerary: ItineraryChange) => {
  
  if (itinerary.requestType === "Edit") {
    const { data, error } = await supabase
    .from("itineraries")
    .update([
      {
        id: itinerary.id,
        deleted_at:null,
        tripName: itinerary.tripName,
        BookingPage: itinerary.BookingPage,
        description: itinerary.description,
        price: itinerary.price,
        shopId: itinerary.shopId,
        siteList: itinerary.siteList,
        startDate: itinerary.startDate,
        endDate: itinerary.endDate,
      },
    ])
    .eq('id', itinerary.OriginalItineraryID);

    return {
      data: data,
      error: error,
    };

  } else {
    const response = await supabase
    .from('itineraries')
    .update([
      {
        deleted_at : new Date(),
      },
    ])
    .eq('id', itinerary.OriginalItineraryID);
    
    return {
      data: response.data,
      error: response.error,
    };
  }
};

export const deleteItinerary = async (itinerary: ItineraryChange) => {
  
  if (itinerary.requestType === "Delete") {
    const { data, error } = await supabase
    .from("itineraries")
    .delete()
    .eq('id', itinerary.OriginalItineraryID);
    
    return {
      data: data,
      error: error,
    };
  }
};