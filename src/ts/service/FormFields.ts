import { FormField, InputsTypes, Properties } from "../model/types";

export const formFieldsGenerator: FormField[] = [
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
];
export const formFieldsHeader: FormField[] = [
  {
    wrapperClassName: `form-group-element form-group-element--showPass`,
    input: {
      type: InputsTypes.STRING,
      id: "show-password",
      className: `form-group-element__input-show-password`,
      label: "show password",
    },
  },
];
