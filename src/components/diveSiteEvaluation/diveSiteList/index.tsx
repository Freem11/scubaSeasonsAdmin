import { useContext, useEffect } from "react";
import { getAllDiveSiteWaits } from "../../apicalls/supabaseCalls/diveSiteWaitSupabaseCalls";
import DiveSiteListView from "./view";
import { PendingDiveSitesContext } from "../../contexts/diveSiteEvals/diveSitesContext";

export default function DiveSiteList() {
    const { pendingDiveSites, setPendingDiveSites } = useContext(PendingDiveSitesContext)

    useEffect(() => {
        getSeaLifePhotos()
    },[])

    const getSeaLifePhotos = async () => {
        try {
          const records = await getAllDiveSiteWaits();
          if (records) {
            setPendingDiveSites(records);
          }
        } catch (e) {
          console.log({ title: 'Error', message: (e as Error).message });
        }
      };
    
return (
    <DiveSiteListView pendingDiveSitesList={pendingDiveSites}/>

)

}