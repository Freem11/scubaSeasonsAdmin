
import { useContext, useEffect, useState } from "react";
import { Form } from "./form";
import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";
import TripRequestEvalView from "./view";
import { getItineraryByIdRequest, updateItinerary } from "../../apicalls/supabaseCalls/itinerarySupabaseCalls";
import { TripRequest } from "../../entities/tripRequest";
import { create } from "@mui/material/styles/createTransitions";
import { deleteItineraryRequest, getAllItineraryRequest } from "../../apicalls/supabaseCalls/itineraryRequestSupabaseCalls";
import { TripRequestsContext } from "../../contexts/tripRequestEvals/tripRequestContext";
export default function TripRequestEval() {
  const { selectedTripRequest, setSelectedTripRequest } = useContext(SelectedTripRequestContext)
  const { setTripRequests} = useContext(TripRequestsContext)
  const [oldTripValues, setOldTripValues] = useState<TripRequest | null>(null)
  // waiting for the data type that comes back from backend
  const ValidateTripRequest = async (id: number | undefined, formData: Form) => {
    await updateItinerary({
      id: formData.id || id,
      requestType: formData.requestType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      tripName: formData.tripName,
      siteList: formData.siteList,
      description: formData.description,  
      price: formData.price,
      BookingPage: formData.BookingPage,
    });
    
    if (id || formData.id){
      await deleteItineraryRequest(id || formData.id as number);
    }
    const updatedTripRequests = await getAllItineraryRequest();
    setTripRequests(updatedTripRequests.data);
    setSelectedTripRequest(null);
  }

  const RejectTripRequest = async (id: number | undefined) => {
    if(id){
      await deleteItineraryRequest(id);
      const updatedTripRequests = await getAllItineraryRequest();
      setTripRequests(updatedTripRequests.data);
      setSelectedTripRequest(null);
    }
  }

  useEffect(() => {
    getOldTripRequest(selectedTripRequest?.OriginalItineraryID);
  },[]);

  const getOldTripRequest = async (id: number | undefined) => { 
    if(id){
      const data = await getItineraryByIdRequest(id);
      setOldTripValues(data[0]);
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