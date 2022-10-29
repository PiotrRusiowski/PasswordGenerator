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
  }: FormProperties) {
    super({
      className,
      id,
      submitCallback,
      submitButtonMessage,
      formHeaderText,
      formFields,
      DOMElement,
    });
  }

  static showPassword(password: string, inputId: string) {
    const input = document.querySelector(`#${inputId}`) as HTMLInputElement;
    if (input) input.value = password;
  }

  static createPassStrength(strength = "weak") {
    const domElement = FormHeader.createDivElement(strength, "pass-strength");
    domElement.textContent = strength;
    new Array(5)
      .fill("pass-Strength__box")
      .forEach((className) =>
        domElement.appendChild(FormHeader.createDivElement(className))
      );
    return domElement;
  }
}
