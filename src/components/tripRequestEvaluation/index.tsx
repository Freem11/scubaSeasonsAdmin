
import { useContext, useEffect, useState } from "react";
import { Form } from "./form";
import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";
import TripRequestEvalView from "./view";
import { getItineraryByIdRequest } from "../../apicalls/supabaseCalls/itinerarySupabaseCalls";
export default function TripRequestEval() {
  const { selectedTripRequest, setSelectedTripRequest } = useContext(SelectedTripRequestContext)

  // const { oldTripValue, setOldTripValue } = useState([]); 
  // waiting for the data type that comes back from backend
  const ValidateTripRequest = async (id: number | undefined, formData: Form) => {
    if (id && formData.startDate && formData.endDate){
      console.log("validate trip request")
    }
  }

  const RejectTripRequest = async (id: number | undefined) => {
    if(id){
      setSelectedTripRequest(null)
    }
  }

  useEffect(() => {
    getTripRequest(selectedTripRequest?.id);
  },[]);
  
  const getTripRequest = async (id: number | undefined) => {
    if(id){
      const data  = await getItineraryByIdRequest(id);
      console.log("data", data);
      setSelectedTripRequest(data[0])
    
    }
  }

  return (
    <TripRequestEvalView
      validateTripRequest={ValidateTripRequest}
      rejectTripRequest={RejectTripRequest}
      record={selectedTripRequest}
    />
  )
}