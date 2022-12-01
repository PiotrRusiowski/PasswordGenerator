import {
  State,
  Input,
  InputsTypes,
  FormPropertiesExtended,
} from "../model/types";
import FormManager from "./FormManager";

export default class FormManagerExtended extends FormManager {
  private state: State;

  constructor({
    className,
    id,
    submitButton,
    submitButtonMessage,
    formHeaderText,
    formFields,
    DOMElement,
    formElement,
    initialState,
  }: FormPropertiesExtended) {
    super({
      className,
      id,
      submitButton,
      submitButtonMessage,
      formHeaderText,
      formFields,
      DOMElement,
      formElement,
    });
    this.state = initialState;
  }

  static showPassword(password: string, inputId: string) {
    const input = document.querySelector(`#${inputId}`) as HTMLInputElement;
    if (input) input.value = password;
  }

  createForm(): HTMLElement {
    const formElement = super.createForm();

    formElement.appendChild(FormManagerExtended.createPassStrength());
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitButton.submitCallback(this.state, e);
    });
    return formElement;
  }

  protected createInput({
    id,
    className,
    label,
    attributes,
    initialValue,
    type,
  }: Input): HTMLInputElement {
    const inputElement = super.createInput({
      id,
      className,
      label,
      attributes,
      initialValue,
      type,
    });
    const labelElement = super.createLabelElement(label, id);
    if (initialValue) {
      inputElement.value = initialValue;
      labelElement.textContent = "pass length";
      labelElement.appendChild(FormManager.createSpanElement(initialValue));
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
    return inputElement;
  }

  static createPassStrength(strength = "") {
    const passStrength = FormManager.createDivElement(
      `pass-strength`,
      "pass-strength"
    );
    passStrength.textContent = "strength:";
    const passStrengthBoxes = strength.length
      ? FormManager.createDivElement(
          `pass-strength pass-strength__boxes pass-strength__boxes--${strength}`
        )
      : FormManager.createDivElement(`pass-strength pass-strength__boxes`);

    passStrengthBoxes.textContent = strength; /////////////////////////////TUTAJ
    new Array(4)
      .fill(
        strength.length
          ? `pass-strength pass-strength__boxes pass-strength__boxes--${strength} 
          pass-strength__boxes__box`
          : `pass-strength pass-strength__box`
      )
      .forEach((className) =>
        passStrengthBoxes.appendChild(
          FormManagerExtended.createDivElement(className)
        )
      );
    passStrength.appendChild(passStrengthBoxes);
    return passStrength;
  }

  private setState(name: string, value: string | boolean) {
    const state: State = {};
    state[name] = value;
    this.state = { ...this.state, ...state };
  }
}
