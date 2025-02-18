
import { useContext, useEffect, useState } from "react";
import { Form } from "./form";
import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";
import TripRequestEvalView from "./view";
export default function TripRequestEval() {
  const { selectedTripRequest, setSelectedTripRequest } = useContext(SelectedTripRequestContext)

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
      }}
    />
  )
}