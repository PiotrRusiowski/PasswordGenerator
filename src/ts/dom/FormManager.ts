import { FormField, FormProperties, State, Input } from "../model/types";
import FormManagerExtended from "./FormManagerExtended";
import { InputsTypes } from "../model/types";

export default class FormManager {
  private readonly className: string;
  private readonly id: string;
  private readonly formElement!: HTMLElement;
  private readonly formHeaderText: string;
  private readonly submitButtonMessage: string;
  protected readonly submitCallback: Function;
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
    formElement,
  }: FormProperties) {
    this.id = id;
    this.DOMElement = DOMElement;
    this.className = className;
    this.submitCallback = submitCallback;
    this.submitButtonMessage = submitButtonMessage;
    this.formHeaderText = formHeaderText;
    this.formFields = formFields;
    this.formElement = this.createFormElement();
  }

  createForm(): HTMLElement {
    this.formElement.id = this.id;
    this.formElement.className = this.className;
    this.formFields.forEach((field: FormField) => this.createFormField(field));
    if (this.id === "pass-form") {
      this.formElement.appendChild(FormManagerExtended.createPassStrength());
    }
    this.formElement.appendChild(
      FormManager.createSubmitButton(this.submitButtonMessage)
    );
    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitCallback();
    });
    return this.formElement;
  }

  private createFormElement() {
    return document.createElement("form");
  }

  protected createFormField({ wrapperClassName, input }: FormField): void {
    const formField = FormManager.createDivElement(wrapperClassName);
    const inputElement = this.createInput(input);
    const labelElement = this.createLabelElement(input.label, input.id);
    formField.appendChild(labelElement);
    formField.appendChild(inputElement);
    this.formElement.appendChild(formField);
  }

  protected createInput({ id, className, attributes, type }: Input) {
    const inputElement: HTMLInputElement = document.createElement("input");
    if (id) {
      inputElement.id = id;
    }
    inputElement.type = type;
    inputElement.className = className;
    if (attributes) {
      attributes.forEach(([name, value]) => {
        inputElement.setAttribute(name, value);
      });
    }
    return inputElement;
  }

  protected createLabelElement(label: string, id: string) {
    const labelElement: HTMLLabelElement = document.createElement("label");
    if (label) {
      labelElement.setAttribute("for", id);
      labelElement.textContent = label;
    }

    return labelElement;
  }

  protected static createDivElement(className = "", id = "") {
    const divElement = document.createElement("div");
    if (id.length) {
      divElement.id = id;
    }
    if (className.length) {
      divElement.className = className;
    }
    return divElement;
  }

  protected static createSpanElement(text: string): HTMLElement {
    const spanElement = document.createElement("span");
    spanElement.textContent = text;
    return spanElement;
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
