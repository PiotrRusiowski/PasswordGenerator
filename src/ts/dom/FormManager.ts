import { FormProperties } from "../model/types";

export default class FormManager {
  private id: string;
  private submitButtonMessage: string;
  private submitCallback: Function;
  private formHeaderText: string;
  private formFields: any[];
  constructor(formProperties: FormProperties) {
    const {
      id,
      submitCallback,
      submitButtonMessage,
      formHeaderText,
      formFields,
    } = formProperties;
    this.id = id;
    this.submitCallback = submitCallback;
    this.submitButtonMessage = submitButtonMessage;
    this.formHeaderText = formHeaderText;
    this.formFields = formFields;
  }

  createForm() {
    const formElement: HTMLElement = document.createElement("form");
    formElement.id = this.id;
    const formHeader: HTMLElement = document.createElement("h3");
    formHeader.className = "form-header";
    formHeader.textContent = this.formHeaderText;
    formElement.appendChild(formHeader);
    return formElement;
  }
}
