import { useContext, useEffect } from "react";
import { getAllDiveShopWaits } from "../../apicalls/supabaseCalls/diveShopWaitSupabaseCalls";
import PartnerRequestListView from "./view";
import { PendingDiveShopsContext } from "../../contexts/diveShopEvals/diveShopsContext";

export default function PartnerRequestList() {
    const { pendingDiveShops, setPendingDiveShops } = useContext(PendingDiveShopsContext)

    useEffect(() => {
        getSeaLifePhotos()
    },[])

    const getSeaLifePhotos = async () => {
        try {
          const records = await getAllDiveShopWaits();
          if (records) {
            setPendingDiveShops(records);
          }
        } catch (e) {
          console.log({ title: 'Error', message: (e as Error).message });
        }
      };
    
return (
    <PartnerRequestListView pendingDiveShopsList={pendingDiveShops}/>

)

}