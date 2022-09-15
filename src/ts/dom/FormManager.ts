import { FormProperties, FormField } from "../model/types";

export default class FormManager {
  className: string;
  private formElement: HTMLElement = this.createFormElement();
  private readonly submitButtonMessage: string;
  private readonly submitCallback: Function;
  private readonly formHeaderText: string;
  private formFields: FormField[];
  private state = {};
  constructor({
    className,
    submitCallback,
    submitButtonMessage,
    formHeaderText,
    formFields,
  }: FormProperties) {
    this.className = className;
    this.submitCallback = submitCallback;
    this.submitButtonMessage = submitButtonMessage;
    this.formHeaderText = formHeaderText;
    this.formFields = formFields;
  }
  private createFormElement() {
    const formElement: HTMLElement = document.createElement("form");
    return formElement;
  }
  createForm(): HTMLElement {
    this.formElement.className = this.className;
    this.formFields.forEach((el) => this.createInput(el));
    this.formElement.appendChild(
      FormManager.createSubmitButton(this.submitButtonMessage)
    );
    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitCallback();
    });
    return this.formElement;
  }
  private createInput({ type, labels }: FormField) {
    return labels.forEach((label) => {
      const id: string = label;
      const formGroupElement = FormManager.createFormGroupElement();

      const inputElement = document.createElement("input");
      inputElement.id = id;
      inputElement.type = type;
      inputElement.name = type;
      inputElement.className = "form-control";
      formGroupElement.appendChild(inputElement);

      const labelElement: HTMLLabelElement = document.createElement("label");
      labelElement.setAttribute("for", id);
      labelElement.textContent = id;
      formGroupElement.appendChild(labelElement);

      this.formElement.appendChild(formGroupElement);
    });
  }
  private static createFormGroupElement() {
    const formGroupElement = document.createElement("div");
    formGroupElement.className = "form-group";
    return formGroupElement;
  }
  private static createSubmitButton(message: string) {
    const formattedMessage = message.toUpperCase();
    const buttonElement = document.createElement("button");
    buttonElement.className = "btn ";
    buttonElement.setAttribute("type", "submit");
    buttonElement.textContent = formattedMessage;
    return buttonElement;
  }
}
