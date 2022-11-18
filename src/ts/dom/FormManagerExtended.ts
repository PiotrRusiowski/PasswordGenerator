import {
  FormField,
  FormProperties,
  PassStrength,
  State,
  Selector,
} from "../model/types";
import FormManager from "./FormManager";

export default class FormManagerExtended extends FormManager {
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
    const passStrength = FormManagerExtended.createDivElement(
      `pass-strength`,
      "pass-strength"
    );
    passStrength.textContent = "strength:";
    const passStrengthBoxes = strength.length
      ? FormManagerExtended.createDivElement(
          `pass-strength pass-strength__boxes pass-strength__boxes--${strength}`
        )
      : FormManagerExtended.createDivElement(
          `pass-strength pass-strength__boxes`
        );

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
}
