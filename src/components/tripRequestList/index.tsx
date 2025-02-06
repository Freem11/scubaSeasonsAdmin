import { useContext, useEffect } from "react";
import { getAllItineraryRequest } from "../../apicalls/supabaseCalls/itineraryRequestSupabaseCalls";
import { TripRequestsContext } from "../../contexts/tripRequestEvals/tripRequestContext";
import TripRequestListView from "./view";

export default function TripRequestList() {
    const { tripRequests, setTripRequests } = useContext(TripRequestsContext);

    useEffect(() => {
      getTripRequests();
    },[])

    const getTripRequests = async () => {
        try {
          const records = await getAllItineraryRequest();
          if (records) {
            setTripRequests(records.data);
          }
        } catch (e) {
          console.log({ title: 'Error', message: (e as Error).message });
        }
      };
    
  return (
        <TripRequestListView pendingTripRequestList={tripRequests}/>
  )
}