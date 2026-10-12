import { useContext, useEffect } from "react";

import { getUnverifiedDiveSites } from "../../apicalls/supabaseCalls/diveSiteSupabaseCalls";
import UnverifiedDiveSiteListView from "./view";
import { UnverifiedDiveSitesContext } from "../../contexts/unverifieddiveSiteEvals/diveSitesContext";

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