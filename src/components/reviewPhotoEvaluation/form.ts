import { FormValidationRules } from "../../forms/form";
import { Option } from '../../reusables/select';

export interface Form {
  animal?:          Option
  divesite_id?:     number
  review_id?:       number
  dive_date?:       string 
  photo?:           string
}


export const FormRules: FormValidationRules<Form> = {
  divesite_id: {
    required: 'Dive Site Id Number is Required',
  },
  photo: {
    required: 'Photo is Required',
  }
};
