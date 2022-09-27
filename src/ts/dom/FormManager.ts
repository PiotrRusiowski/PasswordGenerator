import { FormProperties, FormField, State } from "../model/types";

export default class FormManager {
  className;
  private formElement: HTMLElement = this.createFormElement();
  private state: State = {};
  private readonly formHeaderText;
  private readonly submitButtonMessage;
  private readonly submitCallback;
  private formFields;
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

  createForm(): HTMLElement {
    this.formElement.className = this.className;
    this.formFields.forEach((el) => this.createInput(el));
    this.formElement.appendChild(
      FormManager.createSubmitButton(this.submitButtonMessage)
    );
    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(this.state);
      this.submitCallback(this.state);
    });
    return this.formElement;
  }

  private createFormElement() {
    const formElement: HTMLElement = document.createElement("form");
    return formElement;
  }
  private createInput({ type, labels }: FormField) {
    return labels.forEach((label) => {
      const id: string = label;
      const formGroupElement = FormManager.createFormGroupElement(type);

      const inputElement: HTMLInputElement = document.createElement("input");
      inputElement.id = id;
      inputElement.type = type;
      inputElement.name = type;
      inputElement.className = "form-control";
      formGroupElement.appendChild(inputElement);
      if (type === "range") {
        inputElement.setAttribute("min", "5");
        inputElement.setAttribute("max", "20");
      }
      inputElement.addEventListener("input", (e) => {
        switch (type) {
          case "range":
            // @ts-ignore
            return this.setState(label, e.target.value);
          case "checkbox":
            // @ts-ignore
            return this.setState(label, e.target.checked as boolean);
        }
      });

      const labelElement: HTMLLabelElement = document.createElement("label");
      labelElement.setAttribute("for", id);
      labelElement.textContent = id;
      formGroupElement.appendChild(labelElement);

      this.formElement.appendChild(formGroupElement);
    });
  }
  private static createFormGroupElement(type: string) {
    const formGroupElement = document.createElement("div");
    formGroupElement.className = `form-group form-group--${type}`;
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
  private setState(name: string, value: string) {
    console.log(this.state);
    const state: State = {};
    state[name] = value;
    this.state = { ...this.state, ...state };
  }
  static showPassword(password: string, inputId: string) {
    const input = document.querySelector(`#${inputId}`) as HTMLInputElement;
    input.value = password;
  }
}
