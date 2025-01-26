import { useContext } from "react";
import { SelectedPendingDiveSiteContext } from "../../contexts/diveSiteEvals/selectedDiveSiteContext";
import DiveSiteEvalView from "./view";

export default function DiveSiteEval() {
  const { selectedPendingDiveSite } = useContext(SelectedPendingDiveSiteContext)

        return (
            <DiveSiteEvalView 
            diveSite={selectedPendingDiveSite}
            values={{
              siteName: selectedPendingDiveSite?.name,
              latitude: selectedPendingDiveSite?.lat,
              longitude: selectedPendingDiveSite?.lng,
            }}
            />

        )

}