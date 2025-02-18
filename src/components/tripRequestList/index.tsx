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
        try{
          const records = await getAllItineraryRequest();
          if (records.data) {
            setTripRequests(records.data);
          }
          if (records.error) {  
            toast.error(records.error.message);
          }
        } catch (e) {
          console.log({ title: 'Error', message: (e as Error).message });
      }
    };
    
  return (
        <TripRequestListView pendingTripRequestList={tripRequests}/>
  )
}