import { FormValidationRules } from "../../forms/form";

export interface Form {
  seaCreature?:     string
  latitude?:        number
  longitude?:       number
  date?:            string 
}


export const FormRules: FormValidationRules<Form> = {
  seaCreature: {
    required: 'Sea life name cannot be empty',
  },
  longitude: {
    required: 'Longitude is required',
    min:      {
      value:   -180,
      message: 'Longitude must be greater than -180',
    },
    max:      {
      value:   180,
      message: 'Longitude must be less than 180',
    } },
  latitude: {
    required: 'Longitude is required',
    min:      {
      value:   -180,
      message: 'Latitude must be greater than -180',
    },
    max:      {
      value:   180,
      message: 'Latitude must be less than 180',
    } },
};
