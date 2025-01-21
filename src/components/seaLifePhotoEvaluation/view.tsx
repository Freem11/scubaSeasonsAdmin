import { useForm, FieldErrors } from "react-hook-form";
import { SeaLifePhoto } from "../../entities/seaLifePhoto";
import Button from "../../reusables/button";
import TextInput from "../../reusables/textInput";
import { Form, FormRules } from "./form";
import { useState } from "react";

type SeaLifePhotoEvalViewProps = {
    values?:           Form
    photoRecord:       SeaLifePhoto | null
    validatePhoto:     (id: number| undefined, formDarta: Form) => void;
    onSubmit:          (data: Form) => void
  };

export default function SeaLifePhotoEvalView(props: SeaLifePhotoEvalViewProps) {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({
        values: props.values,
      });

    const [buttonPressed, setButtonPressed] = useState<number>(0)
    const photoName = props.photoRecord?.photofile.split('/').pop();

    const handleError = (errors: FieldErrors<Form>) => {
        console.log(errors)
        // toast.dismiss();
        // Object.values(errors).forEach((error) => {
        //   if (error?.message) {
        //     toast.error(error.message);
        //   }
        // });
      };
    
      const onSubmit = (data: Form) => {
        // toast.dismiss();
        {buttonPressed === 1 &&  props.validatePhoto(props.photoRecord?.id, data)} 
      };
    
return (
    <form onSubmit={handleSubmit(onSubmit, handleError)} style={{width: '100%', height: "100%", display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column'}}>
                <img src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`} width={'60%'}></img>
                <div>
                     <TextInput
                        style={{textAlign: 'center', backgroundColor: 'transparent', fontSize: '24px', color: 'darkgrey'}}
                        error={errors.seaCreature}
                        {...register('seaCreature', FormRules.seaCreature)}
                     />
                    <div style={{width: '30vw', display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                        <h6 style={{color: "black"}}>Contributor: {props.photoRecord?.newusername}</h6>
                        <h6 style={{color: "black" , display: 'flex', flexDirection: "row", alignItems: 'center'}}>Date:     
                            <TextInput
                             style={{textAlign: 'center', backgroundColor: 'transparent', fontSize: '16px', color: 'darkgrey' , width: '9vw'}}
                             error={errors.date} 
                             {...register('date', FormRules.date)}
                            />
                     </h6>
                    </div>
                    <h4 style={{color: "black"}}>Location</h4>
                    <div style={{width: '30vw', display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                       
                        <h6 style={{color: "black", display: 'flex', flexDirection: "row", alignItems: 'center'}}>Lat:
                        <TextInput
                         style={{textAlign: 'center', backgroundColor: 'transparent', fontSize: '16px', color: 'darkgrey', width: '7vw'}}
                         error={errors.latitude} 
                         {...register('latitude', FormRules.latitude)}
                            />
                        </h6>
                        <h6 style={{color: "black" , display: 'flex', flexDirection: "row", alignItems: 'center'}}>Lng: 
                        <TextInput
                         style={{textAlign: 'center', backgroundColor: 'transparent', fontSize: '16px', color: 'darkgrey', width: '7vw'}}
                         error={errors.longitude}  
                         {...register('longitude', FormRules.longitude)}
                            />
                        </h6>
                    </div>
                    </div>

                    <div className="cols mt-8" style={{width: '50vw', display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                       
                       <div className="col-3">
                       <Button
                        onClick={() => setButtonPressed(1)}
                        className="btn-md bg-primary"
                        type="submit"
                        disabled={isSubmitting}
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

               

    </form>
)
}