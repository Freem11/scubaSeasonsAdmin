import { useContext, useEffect } from "react";
import { getAllDiveSiteWaits } from "../../apicalls/supabaseCalls/diveSiteWaitSupabaseCalls";
import DiveSiteListView from "./view";
import { DiveSitesContext } from "../../contexts/diveSitesContext";

export default function DiveSiteList() {
    const { diveSites, setDiveSites } = useContext(DiveSitesContext)

    useEffect(() => {
        getSeaLifePhotos()
    },[])

    const getSeaLifePhotos = async () => {
        try {
          const records = await getAllDiveSiteWaits();
          if (records) {
            setDiveSites(records);
          }
        } catch (e) {
          console.log({ title: 'Error', message: (e as Error).message });
        }
      };
    
return (
    <DiveSiteListView diveSitesList={diveSites}/>

)

}