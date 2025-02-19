
import { useContext, useEffect, useState } from "react";
import { Form } from "./form";
import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";
import TripRequestEvalView from "./view";
import { getItineraryByIdRequest } from "../../apicalls/supabaseCalls/itinerarySupabaseCalls";
import { TripRequest } from "../../entities/tripRequest";
export default function TripRequestEval() {
  const { selectedTripRequest, setSelectedTripRequest } = useContext(SelectedTripRequestContext)

  const [oldTripValues, setOldTripValues] = useState<TripRequest | null>(null)
  // waiting for the data type that comes back from backend
  const ValidateTripRequest = async (id: number | undefined, formData: Form) => {
    if (id && formData.startDate && formData.endDate){
      console.log("validate trip request")
    }
  }

  const RejectTripRequest = async (id: number | undefined) => {
    if(id){
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
        startDate: oldTripValues?.startDate,
        endDate: oldTripValues?.endDate,
        tripName: oldTripValues?.tripName,
        siteList: oldTripValues?.siteList,
        description: oldTripValues?.description,
        price: oldTripValues?.price,
        BookingPage: oldTripValues?.BookingPage,
        OriginalItineraryID: oldTripValues?.OriginalItineraryID
      }}
    />
  )
}