import PasswordsService from "./service/PasswordsService";
import FormManagerExtended from "./dom/FormManagerExtended";
import {
  FormProperties,
  InputsTypes,
  PassStrength,
  Properties,
  State,
} from "./model/types";
import FormManager from "./dom/FormManager";

const passwordGeneratorElement = document.querySelector(
  ".passwordGenerator"
) as HTMLElement;

const ps = new PasswordsService();

const submit = ({ length, ...prop }: State) => {
  const lengthInput = document.querySelector("#length") as HTMLElement;
  const newPassword = ps.passwordGenerator({
    length: Number(length),
    properties: prop,
  });
  FormManagerExtended.showPassword(newPassword.stringPass, "show-password");
  reloadPassStrength(newPassword.passStrength);
};
const copyPassToClipBoard = () => {
  const textarea = document.createElement("textarea");
  const input = document.getElementById("show-password") as HTMLInputElement;
  const password = input.value;
  if (!password) {
    alert("please generate a password");
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("copy password to a clipboard!");
};

const reloadPassStrength = (strength: PassStrength) => {
  console.log(strength);
  const oldPassStr = document.querySelector("#pass-strength");
  const passStr = FormManagerExtended.createPassStrength(strength);
  oldPassStr && oldPassStr.replaceWith(passStr);
};

const formProperties: FormProperties = {
  id: "pass-form",
  DOMElement: passwordGeneratorElement,
  className: "passwordGenerator__box passwordGenerator__box--content",
  submitButtonMessage: "generate",
  submitCallback: submit,
  formHeaderText: "",
  initialState: { length: "5" },

  formFields: [
    {
      wrapperClassName: `form-group-element form-group-element--${InputsTypes.RANGE}`,
      input: {
        type: InputsTypes.RANGE,
        id: "length",
        className: `form-group-element__input-${InputsTypes.RANGE}`,
        attributes: [
          ["min", "5"],
          ["max", "20"],
        ],
        initialValue: "5",
        label: "password length",
      },
    },
    {
      wrapperClassName: `form-group-element form-group-element--${InputsTypes.CHECKBOX}`,
      input: {
        type: InputsTypes.CHECKBOX,
        id: Properties.LOWERCASE,
        className: `form-group-element__input-${InputsTypes.CHECKBOX}`,
        label: Properties.LOWERCASE,
      },
    },
    {
      wrapperClassName: `form-group-element form-group-element--${InputsTypes.CHECKBOX}`,
      input: {
        type: InputsTypes.CHECKBOX,
        id: Properties.UPPERCASE,
        className: `form-group-element__input-${InputsTypes.CHECKBOX}`,
        label: Properties.UPPERCASE,
      },
    },
    {
      wrapperClassName: `form-group-element form-group-element--${InputsTypes.CHECKBOX}`,
      input: {
        type: InputsTypes.CHECKBOX,
        id: Properties.NUMBER,
        className: `form-group-element__input-${InputsTypes.CHECKBOX}`,
        label: Properties.NUMBER,
      },
    },
    {
      wrapperClassName: `form-group-element form-group-element--${InputsTypes.CHECKBOX}`,
      input: {
        type: InputsTypes.CHECKBOX,
        id: Properties.SYMBOL,
        className: `form-group-element__input-${InputsTypes.CHECKBOX}`,
        label: Properties.SYMBOL,
      },
    },
  ],
};
const headerProperties: FormProperties = {
  DOMElement: passwordGeneratorElement,
  id: "",
  className: "passwordGenerator__box passwordGenerator__box--header",
  submitButtonMessage: "co",
  submitCallback: copyPassToClipBoard,
  formHeaderText: "password generator",
  initialState: {},
  formFields: [
    {
      wrapperClassName: `form-group-element form-group-element--showPass`,
      input: {
        type: InputsTypes.STRING,
        id: "show-password",
        className: `form-group-element__input-show-password`,
        label: "show password",
      },
    },
  ],
};

const fm2 = new FormManagerExtended(headerProperties);
const formHeaderElement = fm2.createForm();
passwordGeneratorElement.appendChild(formHeaderElement);

const fm = new FormManager(formProperties);
const formElement = fm.createForm();
passwordGeneratorElement.appendChild(formElement);
