import { useContext, useEffect } from "react";

import { getUnverifiedDiveSites } from "../../../api/supabase/diveSiteSupabaseCalls";
import UnverifiedDiveSiteListView from "./view";
import { UnverifiedDiveSitesContext } from "../../../state/unverifieddiveSiteEvals/diveSitesContext";

export default function UnverfiedDiveSiteList() {
    const { unverifiedDiveSites, setUnverifiedDiveSites} = useContext(UnverifiedDiveSitesContext)

    useEffect(() => {
        getSeaLifePhotos()
    },[])

    const getSeaLifePhotos = async () => {
        try {
          const records = await getUnverifiedDiveSites();
          if (records) {
            setUnverifiedDiveSites(records);
          }
        } catch (e) {
          console.log({ title: 'Error', message: (e as Error).message });
        }
      };
    
return (
    <UnverifiedDiveSiteListView unverifiedDiveSitesList={unverifiedDiveSites}/>

)

}