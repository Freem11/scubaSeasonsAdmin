import { useContext } from "react";
import Tabs from "../../reusables/tabs";
import DiveSiteEval from "../diveSiteEvaluation";
import DiveSiteList from "../diveSiteList";
import SeaLifePhotoEval from "../seaLifePhotoEvaluation";
import SeaLifePhotoList from "../seaLifePhotoList";
import { SelectedSeaLifeContext } from "../../contexts/seaLifeEvals/selectedSeaLifePhotoContext";
import { SelectedPendingDiveSiteContext } from "../../contexts/diveSiteEvals/selectedDiveSiteContext";


export default function LayoutMainView() {
    const {selectedSeaLife} = useContext(SelectedSeaLifeContext)
    const {selectedPendingDiveSite} = useContext(SelectedPendingDiveSiteContext)
return (
    <div className="container-fluid">
        <div className="cols col-gapless">

        <div className="col-4" style={{ overflowX: 'hidden', overflowY: 'scroll', height: '100vh' }}>
        <Tabs data={[
                { key: 't-1', title: 'Sea Life', content: SeaLifePhotoList },
                { key: 't-2', title: 'Dive Sites', content: DiveSiteList },
                { key: 't-3', title: 'Partner Requests', content: 'Partner Requests' },
                { key: 't-3', title: 'Trip Requests', content: 'Trip Edit & Delete Requests' }
              ]}
              />
     </div>
     <div className="col-8" style={{ overflowX: 'hidden', overflowY: 'scroll', height: '100vh' }}>
            {selectedSeaLife && <SeaLifePhotoEval/>}
            {selectedPendingDiveSite && <DiveSiteEval/>}
     </div>

        </div>
    </div>

)

}