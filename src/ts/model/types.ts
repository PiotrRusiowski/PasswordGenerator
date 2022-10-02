export enum Properties {
  UPPERCASE = "uppercase",
  LOWERCASE = "lowercase",
  NUMBER = "number",
  SYMBOL = "symbol",
}
export enum PassStrength {
  WEAK = "weak",
  MEDIUM = "medium",
  STRENGTH = "strength",
}

export interface State {
  [key: string]: string | boolean;
}
export interface charGenerator {
  [key: string]: Function;
}
export interface PasswordProperties {
  length: number;
  properties: State;
}
export interface Password {
  password: string;
  strength: PassStrength;
}
export interface FormField {
  type: string;
  id?: string[];
  className?: string[];
  attributes?: [string, string][];
  labels: string[];
  initialValue?: string;
}
export interface FormProperties {
  className: string;
  submitButtonMessage: string;
  submitCallback: Function;
  formHeaderText: string;
  formFields: FormField[];
}
