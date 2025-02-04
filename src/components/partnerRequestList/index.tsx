import { useContext, useEffect } from "react";
import { partnerRequests as getAllPartnerRequests } from '../../apicalls/supabaseCalls/partnerRequestSupabaseCalls';
import PartnerRequestListView from "./view";
import { PartnerRequestsContext } from "../../contexts/partnerRequestEvals/partnerRequestsContext";

export default function PartnerRequestList() {
    const { partnerRequests, setPartnerRequests } = useContext(PartnerRequestsContext)

    useEffect(() => {
        getPartnerRequests()
    },[])

    const getPartnerRequests = async () => {
        try {
          const records = await getAllPartnerRequests();
          if (records) {
            setPartnerRequests(records);
          }
        } catch (e) {
          console.log({ title: 'Error', message: (e as Error).message });
        }
      };
    
return (
    <PartnerRequestListView partnerRequestsList={partnerRequests}/>

)

}