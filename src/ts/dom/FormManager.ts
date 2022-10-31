import {
  FormField,
  FormProperties,
  PassStrength,
  State,
  Selector,
} from "../model/types";

export default class FormManager {
  private readonly className: string;
  private readonly id: string;
  protected formElement: HTMLElement = this.createFormElement();
  private state: State;
  private readonly formHeaderText: string;
  private readonly submitButtonMessage: string;
  private readonly submitCallback: Function;
  private formFields: FormField[];
  private DOMElement: HTMLElement;

  constructor({
    className,
    id,
    submitCallback,
    submitButtonMessage,
    formHeaderText,
    formFields,
    DOMElement,
    initialState,
  }: FormProperties) {
    this.id = id;
    this.DOMElement = DOMElement;
    this.className = className;
    this.submitCallback = submitCallback;
    this.submitButtonMessage = submitButtonMessage;
    this.formHeaderText = formHeaderText;
    this.formFields = formFields;
    this.state = initialState;
  }

  createForm(): HTMLElement {
    this.formElement.id = this.id;
    this.formElement.className = this.className;
    this.formFields.forEach((el: FormField) => this.createInput(el));

    this.formElement.appendChild(
      FormManager.createSubmitButton(this.submitButtonMessage)
    );
    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitCallback(this.state, e);
    });
    return this.formElement;
  }

  createFormElement() {
    const formElement: HTMLElement = document.createElement("form");
    return formElement;
  }

  private createInput({
    type,
    labels,
    attributes,
    initialValue,
    id,
  }: FormField) {
    return labels.forEach((label: string) => {
      const formGroupElement = FormManager.createDivElement(
        `form-group-element form-group-element--${type}`
      );
      let inputId;
      id ? (inputId = id[0]) : (inputId = label);
      const inputElement: HTMLInputElement = document.createElement("input");
      inputElement.id = inputId;
      inputElement.type = type;
      inputElement.name = type;
      inputElement.className = "form-control";

      formGroupElement.appendChild(inputElement);
      if (attributes) {
        attributes.forEach(([name, value]) => {
          inputElement.setAttribute(name, value);
        });
      }

      const labelElement: HTMLLabelElement = document.createElement("label");
      labelElement.setAttribute("for", inputId);
      labelElement.textContent = inputId;
      formGroupElement.appendChild(labelElement);
      if (initialValue) {
        labelElement.textContent = initialValue;
        inputElement.value = initialValue;
      }
      inputElement.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement;
        switch (type) {
          case "range":
            inputElement.value = target.value;
            labelElement.textContent = target.value;
            return this.setState(label, target.value);
          case "checkbox":
            return this.setState(label, target.checked);
        }
      });
      this.formElement.appendChild(formGroupElement);
    });
  }

  protected static createDivElement(className = "", id = "") {
    const divElement = document.createElement("div");
    if (id.length) divElement.id = id;
    if (className.length) divElement.className = className;
    return divElement;
  }

  private static createSubmitButton(message: string) {
    const formattedMessage = message.toUpperCase();
    const buttonElement = document.createElement("button");
    buttonElement.className = "btn ";
    buttonElement.setAttribute("type", "submit");
    buttonElement.textContent = formattedMessage;
    return buttonElement;
  }

  private setState(name: string, value: string | boolean) {
    const state: State = {};
    state[name] = value;
    this.state = { ...this.state, ...state };
  }
}
