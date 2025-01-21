import { SeaLifePhoto } from "../../entities/seaLifePhoto";
import readableDate from "../../helpers/readableDate";
import Button from "../../reusables/button";


type SeaLifePhotoEvalViewProps = {
    photoRecord: SeaLifePhoto | null
  };

export default function SeaLifePhotoEvalView(props: SeaLifePhotoEvalViewProps) {
    
    console.log(props.photoRecord)
    const photoName = props.photoRecord?.photofile.split('/').pop();

return (
    <div style={{width: '100%', height: "100%", display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column'}}>
                <img src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`} width={'60%'}></img>
                <div>
                    <h2 style={{color: "black"}}>{props.photoRecord?.label}</h2>
                    <div style={{width: '30vw', display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                        <h6 style={{color: "black"}}>Contributor: {props.photoRecord?.newusername}</h6>
                        <h6 style={{color: "black"}}>Date: {readableDate(props.photoRecord?.dateTaken)}</h6>
                    </div>
                    <h4 style={{color: "black"}}>Location</h4>
                    <div style={{width: '30vw', display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                       
                        <h6 style={{color: "black"}}>Lat: {props.photoRecord?.latitude}</h6>
                        <h6 style={{color: "black"}}>Lng: {props.photoRecord?.longitude}</h6>
                    </div>
                    </div>

                    <div className="cols mt-8" style={{width: '50vw', display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                       
                       <div className="col-3">
                       <Button
                        className="btn-md bg-primary"
                        type="button"
                        >Approve</Button>
                       </div>
                     
                       <div className="col-3">
                        <Button
                        className="btn-md"
                        type="button"
                        >Reject</Button>
                         </div>
                        
                        <div className="col-3">
                           <Button
                        className="btn-md bg-primary"
                        type="button"
                        >Dive Site Header Photo</Button>
                             </div>
                   </div>

               

    </div>
)
}