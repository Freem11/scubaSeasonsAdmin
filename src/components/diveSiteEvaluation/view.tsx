import { useForm, FieldErrors } from "react-hook-form";
import { DiveSite } from "../../entities/diveSite";
import Button from "../../reusables/button";
import TextInput from "../../reusables/textInput";
import { Form, FormRules } from "./form";
import { useState } from "react";
import style from './styles.module.scss';
import MapLoader from "../googleMap";

type SeaLifePhotoEvalViewProps = {
    values?:           Form
    diveSite:          DiveSite | null
    validateDiveSite:  (id: number | undefined, formData: Form) => void;
    rejectDiveSite:    (id: number | undefined) => void;
  };   

export default function DiveSiteEvalView(props: SeaLifePhotoEvalViewProps) {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({
        values: props.values,
      });

    const [buttonPressed, setButtonPressed] = useState<number>(0)

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
        {buttonPressed === 1 &&  props.validateDiveSite(props.diveSite?.id, data)} 
        {buttonPressed === 2 &&  props.rejectDiveSite(props.diveSite?.id)}
      };
    
return (
    <form onSubmit={handleSubmit(onSubmit, handleError)} className="cols col-12 mt-2 flex-column full-height">
      <div style={{height: '70vh', width: '100%'}}>
        <MapLoader/>
      </div>
      <div style={{height: '30vh'}}>
        <div className="mt-2">
          <div className="col-12 my-2">
            <TextInput className={style.textInputTitle} style={{textAlign: 'center', backgroundColor: "transparent"}}
              error={errors.siteName}
              {...register('siteName', FormRules.siteName)}
            />
          </div>
        </div>

        <div className="col-12 flex-row-between mt-2"style={{alignItems: 'center', justifyContent: 'space-between'}}>      
          <h6 className={style.tagBox}>Contributor: {props.diveSite?.newusername}</h6>
          <h6 className={style.tagBox}>Lat:
            <TextInput className={style.textInput} style={{backgroundColor: "transparent"}}
              error={errors.latitude} 
              {...register('latitude', FormRules.latitude)}
                />
          </h6>
          <h6 className={style.tagBox}>Lng: 
            <TextInput className={style.textInput} style={{backgroundColor: "transparent"}}
              error={errors.longitude}  
              {...register('longitude', FormRules.longitude)}
                />
          </h6>
        </div>
        <div className="cols col-12 mt-8 flex-row-between">                 
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
          onClick={() => setButtonPressed(2)}
          className="btn-md"
          type="submit"
          >Reject</Button>
          </div>
        </div>
      </div>   
    </form>
)
}