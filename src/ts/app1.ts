import PasswordsService from "./service/PasswordsService";
import FormManagerExtended from "./dom/FormManagerExtended";
import { formFieldsGenerator, formFieldsHeader } from "./service/FormFields";
import {
  FormProperties,
  FormPropertiesExtended,
  PassStrength,
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
  const oldPassStr = document.querySelector("#pass-strength");
  const passStr = FormManagerExtended.createPassStrength(strength);
  oldPassStr && oldPassStr.replaceWith(passStr);
};

const formProperties: FormPropertiesExtended = {
  id: "",
  DOMElement: passwordGeneratorElement,
  className: "passwordGenerator__box passwordGenerator__box--content",
  submitButtonMessage: "generate",
  submitButton: {
    className: "btn btn--content",
    submitCallback: submit,
  },
  formHeaderText: "",
  initialState: { length: "5" },
  formFields: formFieldsGenerator,
};
const headerProperties: FormProperties = {
  DOMElement: passwordGeneratorElement,
  id: "",
  className: "passwordGenerator__box passwordGenerator__box--header",
  submitButtonMessage: "co",
  submitButton: {
    className: "btn btn--header",
    submitCallback: copyPassToClipBoard,
  },
  formHeaderText: "password generator",
  formFields: formFieldsHeader,
};

const fm2 = new FormManager(headerProperties);
const formHeaderElement = fm2.createForm();
passwordGeneratorElement.appendChild(formHeaderElement);

const fm = new FormManagerExtended(formProperties);
const formElement = fm.createForm();
passwordGeneratorElement.appendChild(formElement);
