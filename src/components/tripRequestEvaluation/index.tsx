
import { useContext } from "react";
import readableDate from "../../helpers/readableDate";
import { Form } from "./form";
import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";
import TripRequestEvalView from "./view";

export default function TripRequestEval() {
  console.log("did it go here?");
  const { selectedTripRequest, setSelectedTripRequest } = useContext(SelectedTripRequestContext)

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

  return (
    <TripRequestEvalView
      values={{
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