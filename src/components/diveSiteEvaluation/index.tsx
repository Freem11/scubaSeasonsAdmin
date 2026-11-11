import { useContext, useEffect } from "react";

import { deleteDiveSiteWait, getAllDiveSiteWaits, grabDiveSiteWaitById } from "../../api/supabase/diveSiteWaitSupabaseCalls";
import { SelectedPendingDiveSiteContext } from "../../state/diveSiteEvals/selectedDiveSiteContext";
import { insertDiveSite } from "../../api/supabase/diveSiteSupabaseCalls";
import { PendingDiveSitesContext } from "../../state/diveSiteEvals/diveSitesContext";
import DiveSiteEvalView from "./view";

export default function DiveSiteEval() {
    const { selectedPendingDiveSite, setSelectedPendingDiveSite } = useContext(SelectedPendingDiveSiteContext)
    const { setPendingDiveSites } = useContext(PendingDiveSitesContext)

    const validateDiveSite = async (id: number| undefined) => {
        if (id) {
            const diveSiteById = await grabDiveSiteWaitById(id);
            await insertDiveSite(diveSiteById && diveSiteById[0])
            await deleteDiveSiteWait(id)
            setSelectedPendingDiveSite(null)
            const diveSitesToVett = await getAllDiveSiteWaits();
            setPendingDiveSites(diveSitesToVett);
        }
    };

    const rejectDiveSite = async(id: number| undefined) => {
        if (id) {
            await deleteDiveSiteWait(id);
            setSelectedPendingDiveSite(null)
            const diveSitesToVett = await getAllDiveSiteWaits();
            setPendingDiveSites(diveSitesToVett);
        }
    };

    useEffect(() => {
        return () => {
            setSelectedPendingDiveSite(null);
        }
    }, [setSelectedPendingDiveSite]);
  
    return (
        <DiveSiteEvalView
            validateDiveSite={validateDiveSite}
            rejectDiveSite={rejectDiveSite}
            diveSite={selectedPendingDiveSite}
            values={{
                siteName: selectedPendingDiveSite?.name,
                latitude: selectedPendingDiveSite?.lat,
                longitude: selectedPendingDiveSite?.lng,
            }}
        />
    )
}