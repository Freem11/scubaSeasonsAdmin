
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
  //edit --> save record to table 
};

export const updateItinerary = async (itinerary: any) => {
  
  console.log("itinerary", itinerary);
  if (itinerary.requestType === "Edit") {
    const { data, error } = await supabase
    .from("itineraries")
    .update([
      {
        tripName: itinerary.tripName,
        BookingPage: itinerary.BookingPage,
        created_at: new Date(),
        description: itinerary.description,
        price: itinerary.price,
        shopId: itinerary.shopId,
        siteList: itinerary.siteList,
        startDate: itinerary.startDate,
        endDate: itinerary.endDate,
        OriginalItineraryID: itinerary.OriginalItineraryID,
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
      {deleted_at : new Date()},
    ])
    .eq('id', itinerary.OriginalItineraryID);
    
    return {
      data: response.data,
      error: response.error,
    };
  }
};