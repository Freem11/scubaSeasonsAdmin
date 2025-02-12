
import { useContext, useEffect, useState } from "react";
import readableDate from "../../helpers/readableDate";
import { Form } from "./form";
import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";
import TripRequestEvalView from "./view";
import {toast} from 'react-toastify';
import { getItineraryByIdRequest } from "../../apicalls/supabaseCalls/itinerarySupabaseCalls";

export default function TripRequestEval() {
  const { selectedTripRequest, setSelectedTripRequest } = useContext(SelectedTripRequestContext)

  // const { oldTripValue, setOldTripValue } = useState([]); 
  // waiting for the data type that comes back from backend
  const ValidateTripRequest = async (id: number | undefined, formData: Form) => {
    if (id && formData.startDate && formData.endDate){
      //await insertTripRequest
      console.log("validate trip request")
    }
  }

  const RejectTripRequest = async (id: number | undefined) => {
    if(id){
      setSelectedTripRequest(null)
    }
  }

  useEffect(() => {
    getoldTripRequest(selectedTripRequest?.id);
  },[]);
  
  const getoldTripRequest = async (id: number | undefined) => {
    if(id){
      const data = await getItineraryByIdRequest(id);
      console.log("data", data);
      // if (data.data){
      //   setOldTripValue(data.data);
      // }
      // if(data.error){  
      //   toast.error(data.error.message);
      // }
    }
  }

  return (
    <TripRequestEvalView
      updatedValues={{
        startDate: selectedTripRequest?.startDate && readableDate(selectedTripRequest?.startDate),
        endDate: selectedTripRequest?.endDate && readableDate(selectedTripRequest?.endDate),
        tripName: selectedTripRequest?.tripName,    
        description: selectedTripRequest?.description,
        price: selectedTripRequest?.price,
        BookingPage: selectedTripRequest?.BookingPage,
        siteList: selectedTripRequest?.siteList,
        createdAt: selectedTripRequest?.created_at,
        shopId: selectedTripRequest?.shopId,
      }}
      validateTripRequest={ValidateTripRequest}
      rejectTripRequest={RejectTripRequest}
      record={selectedTripRequest}
    />
      
    )
  }