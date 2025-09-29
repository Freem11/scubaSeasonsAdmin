import { useForm, FieldErrors } from "react-hook-form";
import Button from "../../reusables/button";
import TextInput from "../../reusables/textInput";
import { Form, FormRules } from "./form";
import { useState } from "react";
import style from './styles.module.scss';
import { ReviewPhotoWithInfo } from "../../entities/reviewPhotoWithInfo";
import { DiveSite } from "../../entities/diveSite";
import DynamicSelect from "../../reusables/dynamicSelect";
import Icon from "../../icons/Icon";

type SeaLifePhotoEvalViewProps = {
    values?:           Form
    photoRecord:       ReviewPhotoWithInfo | null
    diveSiteInfo:      DiveSite | null
    diveSiteHeader:    (id: number | undefined, formData: Form) => void;
    getMoreAnimals:       (search: string, limit: number, skip: number) => Promise<any>
  };

export default function ReviewPhotoEvalView(props: SeaLifePhotoEvalViewProps) {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({
        values: props.values,
      });

    const [buttonPressed, setButtonPressed] = useState<number>(0)
    const photoName = props.photoRecord?.photoPath.split('/').pop();

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
        // {buttonPressed === 1 &&  props.validatePhoto(props.photoRecord?.id, data)} 
        // {buttonPressed === 2 &&  props.rejectPhoto(props.photoRecord?.id)}
        // {buttonPressed === 3 &&  props.diveSiteHeader(props.photoRecord?.id, data)}
      };
    
return (
    <form onSubmit={handleSubmit(onSubmit, handleError)} className="cols col-12 mt-2 flex-column full-height">
                <img src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`} width={'60%'}></img>
                <div className="mt-2">
                    <div className="col-12 my-2">
                     {/* <TextInput className={style.textInputTitle} style={{textAlign: 'center', backgroundColor: "transparent"}}
                        error={errors.seaCreature}
                        {...register('seaCreature', FormRules.seaCreature)}
                     /> */}
                     </div>
                     </div>
            <div className="cols col-12 mt-2 flex-row-between">

                    <div className="col10 flex-row-between mt-2" style={{alignItems: 'center', justifyContent: 'space-between'}}>
                       {/* for photo need */}
                          {/* dive date */}
                          {/* site lat */}
                          {/* site lng */}
                          {/* user_id */}
                          {/* photoPath */}

                          {/* make month (from dive date) */}
                          {/* make sea creature name */}

                       {/* for heat point need */}
                          {/* site lat */}
                          {/* site lng */}
                          {/* user_id */}
                          {/* photoPath */}

                          {/* make month (from dive date) */}
                          {/* make sea creature name */}

                       {/* for ds header need */}
                          {/* diveSite_id */}

                       
                        <h6 className={style.tagBox}>Dive Date: {props.photoRecord?.dive_date}</h6>
                        <h6 className={style.tagBox}>Dive Site: {props.diveSiteInfo?.name}</h6>
                        <h6 className={style.tagBox}>Latitude: {props.diveSiteInfo?.lat}</h6>
                        <h6 className={style.tagBox}>Longitude: {props.diveSiteInfo?.lng}</h6>
                        <h6 className={style.tagBox}>Submitter: {props.photoRecord?.created_by}</h6>
                    </div>

                    <DynamicSelect
                      {...register('animal', FormRules.animal)}
                      allowCreate={true}
                      labelInValue={true}
                      modeSelectedTags="on"
                      placeholder={"Please Enter Sea life Species"}
                      getMoreOptions={props.getMoreAnimals}
                      iconLeft={(
                          <Icon name="shark" />
                      )}
                      error={errors.animal}
                    />

                    </div>

                    <div className="cols col-12 mt-8 flex-row-between">
                       
                       <div className="col-2">
                       <Button
                        onClick={() => setButtonPressed(1)}
                        className="btn-md bg-primary"
                        type="submit"
                        disabled={isSubmitting}
                        >Approve</Button>
                       </div>
                     
                       <div className="col-2">
                        <Button
                        onClick={() => setButtonPressed(2)}
                        className="btn-md"
                        type="submit"
                        >Reject</Button>
                         </div>
                        
                        <div className="col-2">
                        <Button
                         onClick={() => setButtonPressed(3)}
                        className="btn-md bg-primary"
                        type="submit"
                        >Dive Site Header</Button>
                        </div>

                        <div className="col-2">
                        <Button
                         onClick={() => setButtonPressed(4)}
                        className="btn-md bg-primary"
                        type="submit"
                        >Sea Life Sighting</Button>
                        </div>
                   </div>

               

    </form>
)
}