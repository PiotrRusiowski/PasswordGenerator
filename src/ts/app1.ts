import PasswordsService from "./service/PasswordsService";
import FormManager from "./dom/FormManager";
import { Properties, FormProperties, State, PassStrength } from "./model/types";

const generatorHeader = document.querySelector(
  ".passwordGenerator__box--header"
) as HTMLElement;
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
  FormManager.showPassword(newPassword.stringPass, "string");
  reloadPassStrength(newPassword.passStrength);
};

const reloadPassStrength = (strength: PassStrength) => {
  const oldPassStr = document.querySelector("#passStrength");
  const passStr = FormManager.createPassStrength(strength);
  oldPassStr && oldPassStr.replaceWith(passStr);
};

const formProperties: FormProperties = {
  id: "form",
  DOMElement: passwordGeneratorElement,
  className: "passwordGenerator__box passwordGenerator__box--content",
  submitButtonMessage: "generate",
  submitCallback: submit,
  formHeaderText: "",
  formFields: [
    {
      type: "range",
      labels: ["length"],
      attributes: [
        ["min", "5"],
        ["max", "20"],
      ],
      initialValue: "5",
    },
    {
      type: "checkbox",
      labels: [
        Properties.SYMBOL,
        Properties.NUMBER,
        Properties.LOWERCASE,
        Properties.UPPERCASE,
      ],
    },
  ],
};
const headerProperties: FormProperties = {
  DOMElement: passwordGeneratorElement,
  id: "showPass",
  className: "showPass",
  submitButtonMessage: "add",
  submitCallback: submit,
  formHeaderText: "password generator",
  formFields: [
    {
      id: ["password"],
      type: "string",
      labels: ["string"],
    },
  ],
};

const fm2 = new FormManager(headerProperties);
const formHeaderElement = fm2.createForm();
generatorHeader.appendChild(formHeaderElement);

const fm = new FormManager(formProperties);
const formElement = fm.createForm();
passwordGeneratorElement.appendChild(formElement);
