import PasswordsService from "./service/PasswordsService";
import { Password, Properties } from "./model/Password";

const newPassword: Password = {
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
