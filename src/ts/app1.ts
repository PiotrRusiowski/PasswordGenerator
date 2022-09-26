import PasswordsService from "./service/PasswordsService";
import {
  Password,
  Properties,
  FormProperties,
  Property,
  State,
} from "./model/types";
import FormManager from "./dom/FormManager";
const generatorHeader = document.querySelector(
  ".passwordGenerator__box--header"
) as HTMLElement;
const passwordGeneratorElement = document.querySelector(
  ".passwordGenerator"
) as HTMLElement;
const ps = new PasswordsService();

const submit = (state: State) => {
  const lengthInput = document.querySelector("#length") as HTMLElement;
  const length = Number(state.length);
  console.log(state);
  const checkboxes = [...document.querySelectorAll("input[name=checkbox]")].map(
    (checkbox) => {
      const password: Property = {};
      // @ts-ignore
      password[checkbox.id] = checkbox.checked as boolean;
      return password;
    }
  );
  ps.passwordGenerator({ length: length, properties: checkboxes });
  ps.getPassword();
};
const formProperties: FormProperties = {
  className: "passwordGenerator__box passwordGenerator__box--content",
  submitButtonMessage: "generate",
  submitCallback: submit,
  formHeaderText: "",
  formFields: [
    {
      type: "range",
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
  className: "showPass",
  submitButtonMessage: "add",
  submitCallback: submit,
  formHeaderText: "password generator",
  formFields: [
    {
      type: "string",
      labels: [""],
    },
  ],
};

const fm2 = new FormManager(headerProperties);
const formHeaderElement = fm2.createForm();
generatorHeader.appendChild(formHeaderElement);

const fm = new FormManager(formProperties);
const formElement = fm.createForm();
passwordGeneratorElement.appendChild(formElement);
