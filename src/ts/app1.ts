import PasswordsService from "./service/PasswordsService";
import { Types, Properties, FormProperties } from "./model/types";
import FormManager from "./dom/FormManager";
const container = document.querySelector(".container") as HTMLElement;

const formProperties: FormProperties = {
  id: "form",
  submitButtonMessage: "generate",
  submitCallback: () => submit,
  formHeaderText: "password generator",
  formFields: [
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

const fm = new FormManager(formProperties);

const submit = () => console.log("submit");

const newPassword: Types = {
  length: 8,
  properties: [
    { [Properties.LOWERCASE]: true },
    { [Properties.NUMBER]: true },
    { [Properties.SYMBOL]: true },
    { [Properties.UPPERCASE]: true },
  ],
};
const Ps = new PasswordsService();
Ps.passwordGenerator(newPassword);
const form = fm.createForm();
container.appendChild(form);
