import PasswordsService from "./service/PasswordsService";
import { Password } from "./model/Password";

const newPassword: Password = {
  length: 5,
  properties: [{ uppercase: true }, { lowercase: true }, { symbol: false }],
};
const Ps = new PasswordsService();

console.log(String.fromCharCode(97));

console.log(Ps.passwordGenerator(newPassword));
