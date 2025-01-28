import { useContext } from "react";
import { SelectedPendingDiveSiteContext } from "../../contexts/diveSiteEvals/selectedDiveSiteContext";
import DiveSiteEvalView from "./view";
import { deleteDiveSiteWait, getAllDiveSiteWaits, grabDiveSiteWaitById } from "../../apicalls/supabaseCalls/diveSiteWaitSupabaseCalls";
import { insertDiveSite } from "../../apicalls/supabaseCalls/diveSiteSupabaseCalls";
import { PendingDiveSitesContext } from "../../contexts/diveSiteEvals/diveSitesContext";

export default function DiveSiteEval() {
  const { selectedPendingDiveSite, setSelectedPendingDiveSite } = useContext(SelectedPendingDiveSiteContext)
  const { setPendingDiveSites } = useContext(PendingDiveSitesContext)
  const ValidateDiveSite = async (id: number| undefined) => {
    if(id){
      const diveSiteById = await grabDiveSiteWaitById(id);
      await insertDiveSite(diveSiteById && diveSiteById[0])
      await deleteDiveSiteWait(id)
      setSelectedPendingDiveSite(null)
      const diveSitesToVett = await getAllDiveSiteWaits();
      setPendingDiveSites(diveSitesToVett);
    }
  };

  const RejectDiveSite = async(id: number| undefined) => {
    if(id){
    await deleteDiveSiteWait(id);
    setSelectedPendingDiveSite(null)
    const diveSitesToVett = await getAllDiveSiteWaits();
    setPendingDiveSites(diveSitesToVett);
    }
  };
  
        return (
            <DiveSiteEvalView 
            validateDiveSite={ValidateDiveSite}
            rejectDiveSite={RejectDiveSite}
            diveSite={selectedPendingDiveSite}
            values={{
              siteName: selectedPendingDiveSite?.name,
              latitude: selectedPendingDiveSite?.lat,
              longitude: selectedPendingDiveSite?.lng,
            }}
            />

        )

}