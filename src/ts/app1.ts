import PasswordsService from "./service/PasswordsService";
import { Password, Properties, FormProperties, Property } from "./model/types";
import FormManager from "./dom/FormManager";
const passwordGeneratorElement = document.querySelector(
  ".passwordGenerator"
) as HTMLElement;
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
  className: "passwordGenerator__box",
  submitButtonMessage: "generate",
  submitCallback: submit,
  formHeaderText: "password generator",
  formFields: [
    {
      type: "number",
      labels: ["length"],
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
  className: "passwordGenerator__box passwordGenerator__box--header ",
  submitButtonMessage: "",
  submitCallback: submit,
  formHeaderText: "password generator",
  formFields: [
    {
      type: "string",
      labels: ["Password Generator"],
    },
  ],
};

const fm2 = new FormManager(headerProperties);
const formHeaderElement = fm2.createForm();
passwordGeneratorElement.appendChild(formHeaderElement);

const fm = new FormManager(formProperties);
const formElement = fm.createForm();
passwordGeneratorElement.appendChild(formElement);
