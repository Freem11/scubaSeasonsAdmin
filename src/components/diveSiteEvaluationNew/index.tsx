import { useContext, useEffect } from "react";

import { deleteDiveSite, getUnverifiedDiveSites, validateDiveSite } from "../../api/supabase/diveSiteSupabaseCalls";

import { SelectedUnverifiedDiveSiteContext } from "../../state/unverifieddiveSiteEvals/selectedDiveSiteContext";
import { UnverifiedDiveSitesContext } from "../../state/unverifieddiveSiteEvals/diveSitesContext";
import UnverifiedDiveSiteEvalView from "./view";

export default function UnverifiedDiveSiteEval() {
    const { selectedUnverifiedDiveSite, setSelectedUnverifiedDiveSite} = useContext(SelectedUnverifiedDiveSiteContext)
    const { setUnverifiedDiveSites } = useContext(UnverifiedDiveSitesContext)

    const approveDiveSite = async (id: number| undefined) => {
        if (id) {
            await validateDiveSite(id)
            setSelectedUnverifiedDiveSite(null)
            const diveSitesToVett = await getUnverifiedDiveSites();
            setUnverifiedDiveSites(diveSitesToVett);
        }
    };
    
    const rejectDiveSite = async(id: number| undefined) => {
        if (id) {
            await deleteDiveSite(id);
            setSelectedUnverifiedDiveSite(null)
            const diveSitesToVett = await getUnverifiedDiveSites();
            setUnverifiedDiveSites(diveSitesToVett);
        }
    };

    useEffect(() => {
        return () => {
            setSelectedUnverifiedDiveSite(null);
        }
    }, [setSelectedUnverifiedDiveSite]);
  
    return (
        <UnverifiedDiveSiteEvalView
            approveDiveSite={approveDiveSite}
            rejectDiveSite={rejectDiveSite}
            diveSite={selectedUnverifiedDiveSite}
            values={{
                siteName: selectedUnverifiedDiveSite?.name,
                latitude: selectedUnverifiedDiveSite?.lat,
                longitude: selectedUnverifiedDiveSite?.lng,
            }}
        />
    )
}