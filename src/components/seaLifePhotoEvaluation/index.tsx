import { useContext } from "react";
import { SelectedSeaLifeContext } from "../../contexts/selectSeaLifePhotoContext";
import SeaLifePhotoEvalView from "./view";

export default function SeaLifePhotoEval() {
  const {selectedSeaLife} = useContext(SelectedSeaLifeContext)
    
return (
    <SeaLifePhotoEvalView photoRecord={selectedSeaLife}/>

)

}