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
export interface State {
  [key: string]: string | boolean;
}
export interface charGenerator {
  [key: string]: Function;
}
export interface Password {
  length: number;
  properties: State;
}
export interface FormField {
  type: string;
  id?: string[];
  labels: string[];
}
export interface FormProperties {
  className: string;
  submitButtonMessage: string;
  submitCallback: Function;
  formHeaderText: string;
  formFields: FormField[];
}
