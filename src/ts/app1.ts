import PasswordsService from "./service/PasswordsService";
import { Password, Properties, FormProperties, Property } from "./model/types";
import FormManager from "./dom/FormManager";
const container = document.querySelector(".container") as HTMLElement;
const ps = new PasswordsService();

const submit = () => {
  const checkboxes = [...document.querySelectorAll("input[name=checkbox]")].map(
    (checkbox) => {
      const password: Property = {};
      // @ts-ignore
      password[checkbox.id] = checkbox.checked as boolean;
      return password;
    }
  );
  ps.passwordGenerator({ length: 8, properties: checkboxes });
  console.log(ps.getPassword());
};
const formProperties: FormProperties = {
  id: "form",
  submitButtonMessage: "generate",
  submitCallback: submit,
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
    {
      type: "text",
      labels: ["password"],
    },
  ],
};
const fm = new FormManager(formProperties);
const form = fm.createForm();
container.appendChild(form);
