import {
  FormField,
  FormProperties,
  PassStrength,
  State,
  Selector,
  Input,
} from "../model/types";
import FormManagerExtended from "./FormManagerExtended";
import { InputsTypes } from "../model/types";

export default class FormManager {
  private readonly className: string;
  private readonly id: string;
  private readonly formElement!: HTMLElement;
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
    formElement,
  }: FormProperties) {
    this.id = id;
    this.DOMElement = DOMElement;
    this.className = className;
    this.submitCallback = submitCallback;
    this.submitButtonMessage = submitButtonMessage;
    this.formHeaderText = formHeaderText;
    this.formFields = formFields;
    this.state = initialState;
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
      this.submitCallback(this.state, e);
    });
    return this.formElement;
  }

  private createFormElement() {
    return document.createElement("form");
  }

  private createFormField({ wrapperClassName, input }: FormField): void {
    const formField = FormManager.createDivElement(wrapperClassName);
    const inputElement = this.createInput(input, formField);
    this.formElement.appendChild(formField);
  }

  private createInput(
    { id, className, label, attributes, initialValue, type }: Input,
    domElement: HTMLElement
  ) {
    const inputElement: HTMLInputElement = document.createElement("input");
    if (id) {
      inputElement.id = id;
    }
    inputElement.type = type;
    inputElement.className = className;

    domElement.appendChild(inputElement);
    if (attributes) {
      attributes.forEach(([name, value]) => {
        inputElement.setAttribute(name, value);
      });
    }
    inputElement.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      switch (type) {
        case InputsTypes.RANGE:
          inputElement.value = target.value;
          labelElement.textContent = `pass length ${target.value}`;
          return this.setState(id, target.value);
        case InputsTypes.CHECKBOX:
          return this.setState(id, target.checked);
      }
    });

    const labelElement: HTMLLabelElement = document.createElement("label");
    if (label) {
      labelElement.setAttribute("for", id);
      labelElement.textContent = label;
      domElement.appendChild(labelElement);
    }

    if (initialValue) {
      inputElement.value = initialValue;
      labelElement.textContent = "pass length";
      labelElement.appendChild(this.createSpanElement(initialValue));
    }
    return inputElement;
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

  protected createSpanElement(text: string): HTMLElement {
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

  setState(name: string, value: string | boolean) {
    const state: State = {};
    state[name] = value;
    this.state = { ...this.state, ...state };
  }
}
