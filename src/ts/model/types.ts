export enum Properties {
  UPPERCASE = "uppercase",
  LOWERCASE = "lowercase",
  NUMBER = "number",
  SYMBOL = "symbol",
}

export enum InputsTypes {
  CHECKBOX = "checkbox",
  STRING = "string",
  RANGE = "range",
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

interface Input {
  id: string;
  className: string;
  type: string;
  attributes?: [string, string][];
  label?: string;
  initialValue?: string;
}

export interface FormField {
  wrapperClassName?: string;
  input: Input;
}

export interface FormProperties {
  DOMElement: HTMLElement;
  formElement?: HTMLElement;
  id: string;
  className: string;
  submitButtonMessage: string;
  submitCallback: Function;
  formHeaderText: string;
  formFields: FormField[];
  initialState: State;
}

export type Selector = "id" | "class";
