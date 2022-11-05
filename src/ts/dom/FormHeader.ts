import {
  FormField,
  FormProperties,
  PassStrength,
  State,
  Selector,
} from "../model/types";
import FormManager from "./FormManager";

export default class FormHeader extends FormManager {
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
    super({
      className,
      id,
      submitCallback,
      submitButtonMessage,
      formHeaderText,
      formFields,
      DOMElement,
      initialState,
    });
  }

  static showPassword(password: string, inputId: string) {
    const input = document.querySelector(`#${inputId}`) as HTMLInputElement;
    if (input) input.value = password;
  }

  static createPassStrength(strength = "weak") {
    const passStrength = FormHeader.createDivElement(
      `pass-strength }`,
      "pass-strength"
    );
    passStrength.textContent = "strength:";
    const passStrengthBoxes = FormHeader.createDivElement(
      `pass-strength pass-strength__boxes pass-strength--${strength}`
    );
    passStrengthBoxes.textContent = strength;
    new Array(5)
      .fill("pass-strength pass-strength__box")
      .forEach((className) =>
        passStrengthBoxes.appendChild(FormHeader.createDivElement(className))
      );
    passStrength.appendChild(passStrengthBoxes);
    return passStrength;
  }
}
