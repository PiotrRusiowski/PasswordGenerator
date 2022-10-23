"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../model/types");
const Password_1 = __importDefault(require("../model/Password"));
class PasswordsService {
    constructor() {
        this.charGenerator = {
            [types_1.Properties.LOWERCASE]: () => String.fromCharCode(this.drawNumber(97, 122)),
            [types_1.Properties.UPPERCASE]: () => String.fromCharCode(this.drawNumber(65, 90)),
            [types_1.Properties.SYMBOL]: () => String.fromCharCode(this.drawNumber(33, 47)),
            [types_1.Properties.NUMBER]: () => String.fromCharCode(this.drawNumber(48, 57)),
        };
    }
    passwordGenerator({ properties, length }) {
        let generatedPassword = [];
        const types = Object.entries(properties)
            .filter((el) => el[1])
            .map((el) => el[0]);
        for (let i = 0; i < length; i += types.length) {
            types.forEach((type) => {
                generatedPassword = [...generatedPassword, this.charGenerator[type]()];
            });
        }
        return new Password_1.default(PasswordsService.shuffleArray(generatedPassword.slice(0, length)), PasswordsService.passwordStrength(length));
    }
    static shuffleArray(arr) {
        return arr
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }
    static passwordStrength(length) {
        if (length >= 4 && length <= 6) {
            return types_1.PassStrength.WEAK;
        }
        if (length > 6 && length <= 12) {
            return types_1.PassStrength.MEDIUM;
        }
        if (length > 12) {
            return types_1.PassStrength.STRENGTH;
        }
        else
            return types_1.PassStrength.WEAK;
    }
    drawNumber(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
exports.default = PasswordsService;
