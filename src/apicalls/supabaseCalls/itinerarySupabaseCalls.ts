
import { TripRequest } from '../../entities/tripRequest';
import { supabase } from '../supabase';

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
  
  if (itinerary.requestType === "Edit") {
    const { data, error } = await supabase
    .from("itineraries")
    .update([
      {
        tripName: itinerary.tripName,
        BookingPage: itinerary.BookingPage,
        //what do I replace this with?
        OriginalItineraryID: 0,
        created_at: new Date(),
        description: itinerary.description,
        price: itinerary.price,
        requestType: itinerary.requestType,
        shopId: itinerary.shopId,
        siteList: itinerary.siteList,
        startDate: itinerary.startDate,
        endDate: itinerary.endDate
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