import { FormValidationRules } from "../../shared/forms/form";
import { validationEmail } from "../../shared/forms/validation";
import screenData from '../../shared/strings.json';

export interface Form {
  email: string
}

export const FormRules: FormValidationRules<Form> = {
  email: {
    required: screenData.PasswordRecoveryPage.emailInvalidMessage,
    ...validationEmail,
  },

};
