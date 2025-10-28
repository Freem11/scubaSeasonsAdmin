import { useForm, FieldErrors } from "react-hook-form";
import Button from "../../reusables/button";
import { Form, FormRules } from "./form";
import { useState } from "react";
import style from './styles.module.scss';
import { ReviewPhotoWithInfo } from "../../entities/reviewPhotoWithInfo";
import { DiveSite } from "../../entities/diveSite";
import DynamicSelect from "../../reusables/dynamicSelect";
import Icon from "../../icons/Icon";
import { Option } from "../../reusables/select";
import { cloudflareBucketUrl } from "../../globalVariables";

type SeaLifePhotoEvalViewProps = {
    values?:           Form
    photoRecord:       ReviewPhotoWithInfo | null
    diveSiteInfo:      DiveSite | null
    getMoreAnimals:    (search: string, limit: number, skip: number) => Promise<any>
    okPhoto:           (reviewPhotoId: number) => void;
    rejectPhoto:       (reviewPhotoId: number) => void;
    headerPromote:     (reviewPhotoId: number, divesite_id: number, photoPath: string) => void;
    sightingPromote:   (reviewPhoto: ReviewPhotoWithInfo, diveSiteInfo: DiveSite, animalLabel: Option | undefined) => void;
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
        {buttonPressed === 1 &&  props.photoRecord && props.okPhoto(props.photoRecord.id)} 
        {buttonPressed === 2 &&  props.photoRecord && props.rejectPhoto(props.photoRecord.id)}
        {buttonPressed === 3 &&  props.photoRecord && props.headerPromote(props.photoRecord.id, props.photoRecord.divesite_id, props.photoRecord.photoPath)}
        {buttonPressed === 4 &&  props.photoRecord &&  props.diveSiteInfo && props.sightingPromote(props.photoRecord, props.diveSiteInfo, data.animal)}
      };
    
  return (
    <form onSubmit={handleSubmit(onSubmit, handleError)} className="cols col-12 mt-2 flex-column full-height">
                <img src={`${cloudflareBucketUrl}${photoName}`} width={'60%'} height={'50%'} style={{marginTop: '5%'}}></img>
                  
            <div className="cols col-12 mt-2 flex-row-between">

                    <div className="col-10 flex-row-between mt-2" style={{alignItems: 'center', justifyContent: 'space-between'}}>
        
                        <div className="col-2"/>
                        <h6 className={style.tagBox}>Dive Date: {props.photoRecord?.dive_date}</h6>
                        <h6 className={style.tagBox}>Dive Site: {props.diveSiteInfo?.name}</h6>
                        <h6 className={style.tagBox}>Latitude: {props.diveSiteInfo?.lat}</h6>
                        <h6 className={style.tagBox}>Longitude: {props.diveSiteInfo?.lng}</h6>
                        <h6 className={style.tagBox}>Submitter: {props.photoRecord?.created_by}</h6>
                    </div>

                    </div>


                    <div className="cols col-12 mt-2 flex-row-between">
                    <div className="col-2"/>
                      <div className="col-8">
                      <h6 className={style.tagBox}>Species:</h6>
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
                      <div className="col-2"/>
                    </div>

                    <div className="cols col-12 mt-8 flex-row-between">
                    <div className="col-1"/>
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
                        <div className="col-1"/>
                        </div>
    </form>
)
}