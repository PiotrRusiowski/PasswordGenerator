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

  static createPassStrength(strength = "") {
    const passStrength = FormHeader.createDivElement(
      `pass-strength`,
      "pass-strength"
    );
    passStrength.textContent = "strength:";
    const passStrengthBoxes = strength.length
      ? FormHeader.createDivElement(
          `pass-strength pass-strength__boxes pass-strength__boxes--${strength}`
        )
      : FormHeader.createDivElement(`pass-strength pass-strength__boxes`);

    passStrengthBoxes.textContent = strength; /////////////////////////////TUTAJ
    new Array(4)
      .fill(
        strength.length
          ? `pass-strength pass-strength__boxes pass-strength__boxes--${strength} 
          pass-strength__boxes__box`
          : `pass-strength pass-strength__boxes 
          pass-strength__boxes__box`
      )
      .forEach((className) =>
        passStrengthBoxes.appendChild(FormHeader.createDivElement(className))
      );
    passStrength.appendChild(passStrengthBoxes);
    return passStrength;
  }
}
