export enum Properties {
  UPPERCASE = "uppercase",
  LOWERCASE = "lowercase",
  NUMBER = "number",
  SYMBOL = "symbol",
}
export type PropertiesNames =
  | Properties.LOWERCASE
  | Properties.UPPERCASE
  | Properties.NUMBER
  | Properties.SYMBOL;

export type Property = {
  [key: string]: boolean;
};
export interface charGenerator {
  [key: string]: Function;
}
export interface Types {
  length: number;
  properties: Property[];
}
export interface FormField {
  type: string;
  labels: string[];
}
export interface FormProperties {
  id: string;
  submitButtonMessage: string;
  submitCallback: Function;
  formHeaderText: string;
  formFields: FormField[];
}
