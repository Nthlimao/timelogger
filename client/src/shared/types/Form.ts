export interface SelectOptions {
  value: string;
  label: string;
}

export interface InputValues {
  [key: string]: string;
}

export interface InputError {
  [key: string]: string;
}

export type ValidationRulesName =
  | "required"
  | "minLength"
  | "maxLength"
  | "email";

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: "email";
}

export interface InputValidations {
  [key: string]: ValidationRules;
}

export type InputType = "text" | "email" | "password" | "number";

export interface FormItem {
  id: string;
  name: string;
  label?: string;
  type?: InputType;
  options?: SelectOptions[];
  inputType: "input" | "select";
}

export interface FormProps {
  values: InputValues;
  errors: InputError;
  inputs: FormItem[];
  handleBlur?: (id: string, value: string) => void;
  handleChange?:
    | React.ChangeEventHandler<HTMLSelectElement>
    | React.ChangeEventHandler<HTMLInputElement>;
}
