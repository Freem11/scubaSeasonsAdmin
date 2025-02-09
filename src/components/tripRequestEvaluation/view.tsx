import { useContext, useState } from "react";
import { SelectedTripRequestContext } from "../../contexts/tripRequestEvals/selectedTripRequestContext";
import { Form } from "./form";
import { TripRequest } from "../../entities/tripRequest";
import styles from './styles.module.scss';
import {  Label } from "reactstrap";
import TextInput from '../../reusables/textInput';
import Button from "../../reusables/button";
import { useForm, FieldErrors } from "react-hook-form";
import PriceTextInput from "../../reusables/priceTextInput";
import Icon from "../../icons/Icon";

type TripRequestEvalViewProps = {
    values?: Form
    record: TripRequest | null
    validateTripRequest: (id: number | undefined, formData: Form) => void
    rejectTripRequest: (id: number | undefined) => void
  };

export default function TripRequestEvalView(props: TripRequestEvalViewProps) {
    // const { setSelectedTripRequest } = useContext(SelectedTripRequestContext)
   
    // const setupTripRequest = (record: TripRequest) => {
    //     setSelectedTripRequest(record);
    // };

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Form>({
        values: props.values,
    });

    const [buttonPressed, setButtonPressed] = useState<number>(0)      
    const onSubmit = (data: Form) => {
        console.log("data", data);
        console.log("buttonPressed", buttonPressed);
        {buttonPressed === 1 &&  props.validateTripRequest(props.record?.id, data)} 
        {buttonPressed === 2 &&  props.rejectTripRequest(props.record?.id)}
    };

    const handleError = (errors: FieldErrors<Form>) => {
        console.log(errors)
      };

    return (
    <form onSubmit={handleSubmit(onSubmit, handleError)} className="cols col-12 mt-2 flex-column full-height">
        <div className="mt-4 flex-column cols col-12">
        <div className={styles.formColumns}>
          <div className={styles.formColumn}>
            <div className={styles.row}>
                <div className={styles.icons}>
                    <Icon name="store" />
                </div>
                <h6 className={styles.tagBox}>TripName: {props.record?.tripName}</h6>
            </div>
            <div className={styles.row}>
                <div className={styles.icons}>
                    <Icon name="link" />
                </div>
                <h6 className={styles.tagBox}>Booking Page URL: {props.record?.BookingPage}</h6>
            </div>
            
            <div className={styles.row}>
                <div className={styles.icons}>
                    <Icon name="currency-usd" />
                </div>
                <h6 className={styles.tagBox}>Price: {props.record?.price}</h6>
            </div>

            <div className={styles.row}>
                <div className={styles.icons}>
                    <Icon name="calendar-start" />
                </div>
                <h6 className={styles.tagBox}>Start Date: {props.record?.startDate}</h6>
            </div>

            <div className={styles.row}>
                <div className={styles.icons}>
                    <Icon name="calendar-end" />
                </div>
                <h6 className={styles.tagBox}>End Date: {props.record?.endDate}</h6>
            </div>

          </div>
          <div className={styles.formColumn}>      
            <p>Dive Sites:</p>
            {props.record?.siteList.map((site) =>(
                <div className={styles.list}>
                    <div className={styles.icons}>
                        <Icon name="check-bold" />
                    </div>
                    <h6 className={styles.tagBox}> {site}</h6>
                </div>
            )) }     
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
    )
}