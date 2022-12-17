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
      label: "range",
    },
  },
  {
    wrapperClassName: `form-group-element form-group-element--${InputsTypes.CHECKBOX}`,

    input: {
      type: InputsTypes.CHECKBOX,
      id: Properties.LOWERCASE,
      attributes: [["checked", "5"]],
      className: `form-group-element__input-${InputsTypes.CHECKBOX}`,
      label: `Include ${Properties.LOWERCASE} Letters`,
    },
  },
  {
    wrapperClassName: `form-group-element form-group-element--${InputsTypes.CHECKBOX}`,
    input: {
      type: InputsTypes.CHECKBOX,
      id: Properties.UPPERCASE,
      attributes: [["checked", "5"]],
      className: `form-group-element__input-${InputsTypes.CHECKBOX}`,
      label: `Include ${Properties.UPPERCASE} Letters`,
    },
  },
  {
    wrapperClassName: `form-group-element form-group-element--${InputsTypes.CHECKBOX}`,
    input: {
      type: InputsTypes.CHECKBOX,
      id: Properties.NUMBER,
      attributes: [["checked", "5"]],
      className: `form-group-element__input-${InputsTypes.CHECKBOX}`,
      label: ` Include ${Properties.NUMBER}`,
    },
  },
  {
    wrapperClassName: `form-group-element form-group-element--${InputsTypes.CHECKBOX}`,
    input: {
      type: InputsTypes.CHECKBOX,
      id: Properties.SYMBOL,
      className: `form-group-element__input-${InputsTypes.CHECKBOX}`,
      label: `Include ${Properties.SYMBOL}`,
    },
  },
];
export const formFieldsHeader: FormField[] = [
  {
    wrapperClassName: `form-group-element form-group-element--show-password`,
    input: {
      type: InputsTypes.STRING,
      id: "show-password",
      className: `form-group-element__input-show-password`,
      label: "",
    },
  },
];
