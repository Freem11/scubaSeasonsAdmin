import { useContext } from "react";
import { SelectedDiveSiteContext } from "../../contexts/selectDiveSiteContext";
import DiveSiteEvalView from "./view";
import { DiveSitesContext } from "../../contexts/diveSitesContext";


export default function DiveSiteEval() {
  const { selectedDiveSite, setSelectedDiveSite } = useContext(SelectedDiveSiteContext)
  const { setDiveSites } = useContext(DiveSitesContext)    


        return (
            <DiveSiteEvalView 
            diveSite={selectedDiveSite}
            values={{
              siteName: selectedDiveSite?.name,
              latitude: selectedDiveSite?.lat,
              longitude: selectedDiveSite?.lng,
            }}
            />

        )

}