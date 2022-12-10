import {
  State,
  Input,
  InputsTypes,
  FormPropertiesExtended,
  FormField,
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
    this.formElement.className = this.className;
    this.formFields.forEach((field: FormField) => this.createFormField(field));
    this.formElement.appendChild(FormManagerExtended.createPassStrength());
    this.formElement.appendChild(
      FormManager.createSubmitButton(
        this.submitButtonMessage,
        this.submitButton.className
      )
    );

    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitButton.submitCallback(this.state, e);
    });
    return this.formElement;
  }

  protected createFormField({ wrapperClassName, input }: FormField): void {
    const { type, initialValue, label, id } = input;
    const formField = FormManager.createDivElement(wrapperClassName);
    const inputElement = this.createInput(input);
    const labelElement = this.createLabelElement(label, id);
    if (initialValue) {
      inputElement.value = initialValue;
      FormManagerExtended.createRangeLabel(inputElement.value, labelElement);
    }
    formField.appendChild(inputElement);
    formField.appendChild(labelElement);
    inputElement.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      switch (type) {
        case InputsTypes.RANGE:
          FormManagerExtended.createRangeLabel(
            inputElement.value,
            labelElement
          );

          return this.setState(id, target.value);
        case InputsTypes.CHECKBOX:
          return this.setState(id, target.checked);
      }
    });

    this.formElement.appendChild(formField);
  }

  private static createRangeLabel(
    passLength: string,
    labelElement: HTMLLabelElement
  ) {
    labelElement.textContent = "pass length";
    labelElement.appendChild(
      FormManager.createSpanElement(
        passLength,
        "form-group-element__pass-length"
      )
    );
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
    console.log(this.state);
    const state: State = {};
    state[name] = value;
    this.state = { ...this.state, ...state };
  }
}
