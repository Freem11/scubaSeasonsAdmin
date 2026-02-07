import {  useState } from "react";
import { Form } from "./form";
import { TripRequest } from "../../entities/tripRequest";
import styles from './styles.module.scss';
import {  Label } from "reactstrap";
import Button from "../../reusables/button";
import { useForm, FieldErrors } from "react-hook-form";
import Icon from "../../icons/Icon";
import SiteSelector from "../../reusables/siteSelector";

type TripRequestEvalViewProps = {
    updatedValues?: Form
    oldValues?: Form
    record: TripRequest | null
    validateTripRequest: (id: number | undefined, formData: Form) => void
    rejectTripRequest: (id: number | undefined) => void
  };

export default function TripRequestEvalView(props: TripRequestEvalViewProps) {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({
        values: props.updatedValues,
    });

    const [buttonPressed, setButtonPressed] = useState<number>(0)      
    const onSubmit = (data: Form) => {
        {buttonPressed === 1 &&  props.validateTripRequest(props.record?.id, data)} 
        {buttonPressed === 2 &&  props.rejectTripRequest(props.record?.id)}
    };

    const handleError = (errors: FieldErrors<Form>) => {
        console.log(errors)
      };

    if (!props.record) {
        return null;
    }

    return (
        <>
        {props.record?.requestType === "Edit" ?
        <form onSubmit={handleSubmit(onSubmit, handleError)} className="cols col-12 mt-2 flex-column full-height">
            <div className="mt-4 flex-column cols col-12">    
                <div className={styles.formColumns}> 
                    <div className={styles.formColumn}>
                        <h3>Updated Data</h3>
                        <div className={styles.row}>
                            <Icon name="store"  
                                width={24}
                                height={24}
                                color="currentColor"
                            />
                            <h6 className={styles.tagBox}>TripName: {props.record?.tripName}</h6>
                        </div>
                        <div className={styles.row}>
                            <Icon name="link"  
                                width={24}
                                height={24}
                                color="currentColor"
                                style={{ 
                                        cursor: 'pointer',
                                        display: 'block', 
                                        overflow: 'visible' 
                                    }}
                            />
                            <h6 className={styles.tagBox}>
                                <span style={{ overflow: 'hidden', textWrap:"wrap" }}>
                                    Booking Page URL: {props.record?.BookingPage}
                                </span>
                            </h6>
                        </div>                      
                        <div className={styles.row}>
                            <Icon name="currency-usd"  
                                width={24}
                                height={24}
                                color="currentColor"
                            />
                            <h6 className={styles.tagBox}>Price: {props.record?.price}</h6>
                        </div>          
                        <div className={styles.row}>       
                            <Icon name="calendar-start"  
                                width={24}
                                height={24}
                                color="currentColor"
                            />
                            <h6 className={styles.tagBox}>Start Date: {props.record?.startDate}</h6>
                        </div>         
                        <div className={styles.row}>
                            <Icon name="calendar-end"  
                                width={24}
                                height={24}
                                color="currentColor"
                            />
                            <h6 className={styles.tagBox}>End Date: {props.record?.endDate}</h6>
                        </div>          
                        <div className={styles.column}>
                            <div className={styles.row}>
                                <Icon name="anchor"  
                                    width={24}
                                    height={24}
                                    color="currentColor"
                                    />
                                Dive Sites:
                            </div>
                            <SiteSelector error={false} siteIds={props.record?.siteList || []}/>
                        </div>
                        <div className="cols col-12 flex ">
                            <Label label="Details" className={styles.detailsField}>
                                <textarea
                                    className={`${styles.textarea} ${errors.siteList && styles.textareaError}`}
                                    placeholder="What divers need to know about this trip..."
                                    value={props.record?.description}
                                />
                            </Label>  
                        </div>
                    </div>
                    
                    <div className={styles.formColumn}>      
                        <h3>Original Data</h3>
                        <div className={styles.row}>
                            <div className={styles.icons}>
                                <Icon name="store" />
                            </div>
                            <h6 className={styles.tagBox}>TripName: {props.oldValues?.tripName}</h6>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.icons}>
                                <Icon name="link" />
                            </div>
                            <h6 className={styles.tagBox}>Booking Page URL: {props.oldValues?.BookingPage}</h6>
                        </div>
                        
                        <div className={styles.row}>
                            <Icon name="currency-usd"  
                                width={24}
                                height={24}
                                color="currentColor"
                            />
                            <h6 className={styles.tagBox}>Price: {props.oldValues?.price}</h6>
                        </div>
            
                        <div className={styles.row}>
                            <div className={styles.icons}>
                                <Icon name="calendar-start" width={24} height={24} />
                            </div>
                            <h6 className={styles.tagBox}>Start Date: {props.oldValues?.startDate}</h6>
                        </div>
            
                        <div className={styles.row}>
                            <div className={styles.icons}>
                                <Icon name="calendar-end" width={24} height={24} />
                            </div>
                            <h6 className={styles.tagBox}>End Date: {props.oldValues?.endDate}</h6>
                        </div>
            
                        <div className={styles.column}>
                            <div className={styles.row}>
                                <Icon name="anchor"  
                                    width={24}
                                    height={24}
                                    color="currentColor"
                                    />
                                Dive Sites:
                            </div>
                            <SiteSelector error={false} siteIds={props.oldValues?.siteList || []}/>
                        </div>

                        <div className="cols col-12 flex ">
                            <Label label="Details" className={styles.detailsField}>
                                <textarea
                                    className={`${styles.textarea} ${errors.siteList && styles.textareaError}`}
                                    placeholder="What divers need to know about this trip..."
                                    value={props.oldValues?.description}
                                />
                            </Label>  
                        </div>       
                    </div>
                </div>                    
                <div className="cols col-9 mt-8 flex-row-between gap-10">                   
                    <div className="col-5">
                        <Button
                        onClick={() => setButtonPressed(1)}
                        className="btn-md bg-primary"
                        type="submit"
                        disabled={isSubmitting}
                        >Approve</Button>
                    </div>                     
                    <div className="col-5">
                        <Button
                        onClick={() => setButtonPressed(2)}
                        className="btn-md"
                        type="submit"
                        >Reject</Button>
                    </div>
                </div>
                
            </div>
        </form>
            :
            <form onSubmit={handleSubmit(onSubmit, handleError)} className="cols col-12 mt-8 flex-column full-height">
                <div className="mt-4 flex-column cols col-12">
                    <div className={styles.formColumns}>
                    <div className={styles.formColumn}>
                        <div className={styles.row}>
                            <div className={styles.icons}>
                            <Icon name="store"  
                                width={24}
                                height={24}
                                color="currentColor"
                            />
                            </div>
                            <h6 className={styles.tagBox}>TripName: {props.record?.tripName}</h6>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.icons}>
                                <Icon name="link"  
                                width={24}
                                height={24}
                                color="currentColor"
                            />
                            </div>
                            <h6 className={styles.tagBox}>Booking Page URL: {props.record?.BookingPage}</h6>
                        </div>
                        
                        <div className={styles.row}>
                            <div className={styles.icons}>
                                <Icon name="currency-usd"  
                                width={24}
                                height={24}
                                color="currentColor"
                                />
                            </div>
                            <h6 className={styles.tagBox}>Price: {props.record?.price}</h6>
                        </div>
            
                        <div className={styles.row}>
                            <div className={styles.icons}>
                                <Icon name="calendar-start"  
                                width={24}
                                height={24}
                                color="currentColor"
                                />
                            </div>
                            <h6 className={styles.tagBox}>Start Date: {props.record?.startDate}</h6>
                        </div>
            
                        <div className={styles.row}>
                            <div className={styles.icons}>
                                <Icon name="calendar-end"  
                                    width={24}
                                    height={24}
                                    color="currentColor"
                                />
                            </div>
                            <h6 className={styles.tagBox}>End Date: {props.record?.endDate}</h6>
                        </div>
            
                    </div>
                
                     <div className={styles.column}>
                            <div className={styles.row}>
                                <Icon name="anchor"  
                                    width={24}
                                    height={24}
                                    color="currentColor"
                                    />
                                Dive Sites:
                            </div>
                            <SiteSelector error={false} siteIds={props.record?.siteList || []}/>
                        </div>
                    </div>
                    <div className="cols col-12 mt-8 flex-row-between gap-10 justify-center">
                        <Label label="Details" className={styles.detailsField}>
                            <textarea
                                className={`${styles.textarea} ${errors.siteList && styles.textareaError}`}
                                placeholder="What divers need to know about this trip..."
                                {...register('description', )}
                            />
                        </Label>  
                    </div>
                    <div className="cols col-8 mt-8 flex-row-between gap-10">                   
                        <div className="col-5">
                            <Button
                            onClick={() => setButtonPressed(1)}
                            className="btn-md bg-primary"
                            type="submit"
                            disabled={isSubmitting}
                            >Approve</Button>
                        </div>                     
                        <div className="col-5">
                            <Button
                            onClick={() => setButtonPressed(2)}
                            className="btn-md"
                            type="submit"
                            >Reject</Button>
                        </div>
                    </div>
                </div>
            </form>
        }
        </>
    )
   
    
}