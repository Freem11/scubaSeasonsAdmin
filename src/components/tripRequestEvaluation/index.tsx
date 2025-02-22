
import { useContext, useEffect, useState } from "react";
import { Form } from "./form";
import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";
import TripRequestEvalView from "./view";
import { getItineraryByIdRequest, getTripRequests, updateItinerary } from "../../apicalls/supabaseCalls/itinerarySupabaseCalls";
import { TripRequest } from "../../entities/tripRequest";
import { deleteItineraryRequest, getAllItineraryRequest } from "../../apicalls/supabaseCalls/itineraryRequestSupabaseCalls";
import { TripRequestsContext } from "../../contexts/tripRequestEvals/tripRequestContext";
export default function TripRequestEval() {
  const { selectedTripRequest, setSelectedTripRequest } = useContext(SelectedTripRequestContext)
  const { setTripRequests} = useContext(TripRequestsContext)
  const [oldTripValues, setOldTripValues] = useState<TripRequest | null>(null)
  // waiting for the data type that comes back from backend
  const ValidateTripRequest = async (id: number | undefined, formData: Form) => {
    console.log("form data on validate", formData);
    await updateItinerary({
      id: formData.id || id,
      startDate: formData.startDate,
      endDate: formData.endDate,
      tripName: formData.tripName,
      siteList: formData.siteList,
      description: formData.description,  
      price: formData.price,
      BookingPage: formData.BookingPage,
      created_at: new Date(),
      OriginalItineraryId: formData.OriginalItineraryID,
      requestType:formData.requestType
    });
    
    if (id || formData.id){
      await deleteItineraryRequest(id || formData.id as number);
      const tripRequest = await getAllItineraryRequest();
      console.log("after update", tripRequest);
    }
    const updatedTripRequests = await getAllItineraryRequest();
    setTripRequests(updatedTripRequests.data);
    setSelectedTripRequest(null);
  }

  const RejectTripRequest = async (id: number | undefined) => {
    if(id){
      // await deleteItineraryRequest(id);
      const updatedTripRequests = await getAllItineraryRequest();
      console.log("updated trip to reject", updatedTripRequests);
      // setTripRequests(updatedTripRequests.data);
      // setSelectedTripRequest(null);
    }
    console.log("rejected, no function yet");
  
  }

  useEffect(() => {
    getOldTripRequest(selectedTripRequest?.OriginalItineraryID);
  },[selectedTripRequest]);

  const getOldTripRequest = async (id: number | undefined) => { 
    if(id){
      const data = await getItineraryByIdRequest(id);
      setOldTripValues(data[0]);
      const allData= await getTripRequests();
      console.log("all trip requests", allData.data);
    }
  }

  return (
    <TripRequestEvalView
      validateTripRequest={ValidateTripRequest}
      rejectTripRequest={RejectTripRequest}
      record={selectedTripRequest}
      updatedValues={{
        id: selectedTripRequest?.id,
        requestType: selectedTripRequest?.requestType,
        startDate: selectedTripRequest?.startDate,
        endDate: selectedTripRequest?.endDate,
        tripName: selectedTripRequest?.tripName,
        siteList: selectedTripRequest?.siteList,
        description: selectedTripRequest?.description,
        price: selectedTripRequest?.price,
        BookingPage: selectedTripRequest?.BookingPage,
        OriginalItineraryID: selectedTripRequest?.OriginalItineraryID
      }}
      oldValues={{
        id: oldTripValues?.id,
        startDate: oldTripValues?.startDate,
        endDate: oldTripValues?.endDate,
        tripName: oldTripValues?.tripName,
        siteList: oldTripValues?.siteList,
        description: oldTripValues?.description,
        price: oldTripValues?.price,
        BookingPage: oldTripValues?.BookingPage,
        OriginalItineraryID: oldTripValues?.OriginalItineraryID,
        requestType: oldTripValues?.requestType
      }}
    />
  )
}