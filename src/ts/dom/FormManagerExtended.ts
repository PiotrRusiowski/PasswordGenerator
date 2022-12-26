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
    const submitButton = FormManager.createSubmitButton(
      this.submitButtonMessage,
      this.submitButton.className
    );
    submitButton.appendChild(FormManager.createIconElement("gg-arrow-right"));

    this.formElement.appendChild(submitButton);

    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitButton.submitCallback(this.state);
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
    labelElement.textContent = "Pass Length";
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
    const passStrengthInfo = FormManager.createDivElement(
      " pass-strength__info"
    );
    passStrength.appendChild(passStrengthInfo);
    const spanStrength = FormManager.createSpanElement(
      "STRENGTH:",
      " pass-strength__info--span-1"
    );
    passStrengthInfo.appendChild(spanStrength);

    const spanStrengthInfo = FormManager.createSpanElement(
      strength.toUpperCase(),
      " pass-strength__info--span-2"
    );
    passStrengthInfo.appendChild(spanStrengthInfo);

    const passStrengthBoxes =
      FormManager.createDivElement(`pass-strength__boxes`);
    new Array(4)
      .fill(
        strength.length
          ? `pass-strength__box pass-strength__box--${strength}`
          : `pass-strength__box`
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
