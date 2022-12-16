export enum Properties {
  UPPERCASE = "Uppercase",
  LOWERCASE = "Lowercase",
  NUMBER = "Number",
  SYMBOL = "Symbol",
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

export interface Input {
  id: string;
  className: string;
  type: string;
  attributes?: [string, string][];
  label: string;
  initialValue?: string;
}

export interface FormField {
  wrapperClassName: string;
  input: Input;
}

export interface FormProperties {
  DOMElement: HTMLElement;
  formElement?: HTMLElement;
  id: string;
  className: string;
  submitButton: submitButton;
  submitButtonMessage: string;
  formHeaderText: string;
  formFields: FormField[];
}

export interface submitButton {
  className: string;
  submitCallback: Function;
}

export interface FormPropertiesExtended extends FormProperties {
  initialState: State;
}

export type Selector = "id" | "class";
