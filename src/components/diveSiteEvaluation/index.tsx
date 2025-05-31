import { useContext, useEffect } from "react";

import { deleteDiveSiteWait, getAllDiveSiteWaits, grabDiveSiteWaitById } from "../../apicalls/supabaseCalls/diveSiteWaitSupabaseCalls";
import { SelectedPendingDiveSiteContext } from "../../contexts/diveSiteEvals/selectedDiveSiteContext";
import { insertDiveSite } from "../../apicalls/supabaseCalls/diveSiteSupabaseCalls";
import { PendingDiveSitesContext } from "../../contexts/diveSiteEvals/diveSitesContext";
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