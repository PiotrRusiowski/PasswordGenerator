"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PasswordsService_1 = __importDefault(require("./service/PasswordsService"));
const newPassword = {
    length: 5,
    properties: [{ uppercase: true }, { lowercase: true }, { symbol: false }],
};
const Ps = new PasswordsService_1.default();
console.log(String.fromCharCode(97));
console.log(Ps.passwordGenerator(newPassword));
