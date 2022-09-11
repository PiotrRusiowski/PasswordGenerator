"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PasswordsService_1 = __importDefault(require("./service/PasswordsService"));
const Password_1 = require("./model/Password");
const newPassword = {
    length: 8,
    properties: [
        { [Password_1.Properties.LOWERCASE]: true },
        { [Password_1.Properties.NUMBER]: true },
        { [Password_1.Properties.SYMBOL]: true },
        { [Password_1.Properties.UPPERCASE]: true },
    ],
};
const Ps = new PasswordsService_1.default();
Ps.passwordGenerator(newPassword);
