import { useContext, useEffect } from "react";
import { getAllItineraryRequest } from "../../apicalls/supabaseCalls/itineraryRequestSupabaseCalls";
import { TripRequestsContext } from "../../contexts/tripRequestEvals/tripRequestContext";
import TripRequestListView from "./view";
import {toast} from 'react-toastify';

export default function TripRequestList() {
    const { tripRequests, setTripRequests } = useContext(TripRequestsContext);

    useEffect(() => {
      getTripRequests();
    },[])

    const getTripRequests = async () => {
        const records = await getAllItineraryRequest();
        if (records.data) {
          setTripRequests(records.data);
        }
        if (records.error) {  
          toast.error(records.error.message);
        }
      };
    
  return (
        <TripRequestListView pendingTripRequestList={tripRequests}/>
  )
}