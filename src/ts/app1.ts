import PasswordsService from "./service/PasswordsService";
import { Password } from "./model/Password";

const newPassword: Password = {
  length: 8,
  properties: [
    { uppercase: true },
    { lowercase: true },
    { symbol: true },
    { number: true },
  ],
};
const Ps = new PasswordsService();
Ps.passwordGenerator(newPassword);
