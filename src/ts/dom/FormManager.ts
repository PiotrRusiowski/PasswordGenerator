import {
  FormField,
  FormProperties,
  PassStrength,
  State,
  Selector,
} from "../model/types";

export default class FormManager {
  className;
  private id;
  private formElement: HTMLElement = this.createFormElement();
  private state: State = { length: "5" };
  private readonly formHeaderText;
  private readonly submitButtonMessage;
  private readonly submitCallback;
  private formFields;
  private DOMElement;

  constructor({
    className,
    id,
    submitCallback,
    submitButtonMessage,
    formHeaderText,
    formFields,
    DOMElement,
  }: FormProperties) {
    this.id = id;
    this.DOMElement = DOMElement;
    this.className = className;
    this.submitCallback = submitCallback;
    this.submitButtonMessage = submitButtonMessage;
    this.formHeaderText = formHeaderText;
    this.formFields = formFields;
  }

  createForm(): HTMLElement {
    this.formElement.className = this.className;
    this.formFields.forEach((el: FormField) => this.createInput(el));
    if (this.id === "form")
      this.formElement.appendChild(
        FormManager.createPassStrength(this.state.length as string)
      );
    this.formElement.appendChild(
      FormManager.createSubmitButton(this.submitButtonMessage)
    );
    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitCallback(this.state);
    });
    return this.formElement;
  }

  private createFormElement() {
    const formElement: HTMLElement = document.createElement("form");
    return formElement;
  }

  private createInput({ type, labels, attributes, initialValue }: FormField) {
    return labels.forEach((label: string) => {
      const id = label;
      const formGroupElement = FormManager.createDivElement(
        `form-group-element form-group-element--${type}`
      );

      const inputElement: HTMLInputElement = document.createElement("input");
      inputElement.id = id;
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
      labelElement.setAttribute("for", id);
      labelElement.textContent = id;
      formGroupElement.appendChild(labelElement);
      if (initialValue) {
        labelElement.textContent = initialValue;
        inputElement.value = initialValue;
      }
      inputElement.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement;
        ///////if(target)????
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

  private static createDivElement(className = "", id = "") {
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

  reloadForm() {
    const oldForm = document.querySelector(".passwordGenerator__box--content");
    console.log(oldForm);
    console.log(this.DOMElement);
    //@ts-ignorew
    this.DOMElement.removeChild(oldForm);
    const formElement = this.createForm();
    this.DOMElement.appendChild(formElement);
  }

  static showPassword(password: string, inputId: string) {
    const input = document.querySelector(`#${inputId}`) as HTMLInputElement;
    if (input) input.value = password;
  }

  static removeElement(selector: Selector, selectorValue: string): void {
    let elementToRemove;
    console.log(elementToRemove);
    selector === "id"
      ? (elementToRemove = document.getElementById(selectorValue))
      : document.getElementsByClassName(selectorValue);
    elementToRemove && elementToRemove.remove();
  }

  static createPassStrength(strength = "weak") {
    const domElement = FormManager.createDivElement(strength, "passStrength");
    domElement.textContent = strength;
    for (let i = 1; i < 4; i++)
      domElement.appendChild(FormManager.createDivElement("dupa"));
    return domElement;
  }
}
