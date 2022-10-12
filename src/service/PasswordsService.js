"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../model/types");
class PasswordsService {
    constructor() {
        this.password = [];
        this.charGenerator = {
            [types_1.Properties.LOWERCASE]: () => String.fromCharCode(this.drawNumber(97, 122)),
            [types_1.Properties.UPPERCASE]: () => String.fromCharCode(this.drawNumber(65, 90)),
            [types_1.Properties.SYMBOL]: () => String.fromCharCode(this.drawNumber(33, 47)),
            [types_1.Properties.NUMBER]: () => String.fromCharCode(this.drawNumber(48, 57)),
        };
    }
    passwordGenerator({ properties, length }) {
        this.password = [];
        let generatedPassword = [];
        const types = Object.entries(properties)
            .filter((el) => el[1])
            .map((el) => el[0]);
        for (let i = 0; i < length; i += types.length) {
            types.forEach((type) => {
                generatedPassword = [...generatedPassword, this.charGenerator[type]()];
            });
        }
        this.password = generatedPassword.slice(0, length);
        return this.password.join("");
    }
    passwordStrength({ properties, length }) {
        if (length >= 4 && length <= 6) {
            return types_1.PassStrength.WEAK;
        }
        if (length > 6 && length <= 12) {
            return types_1.PassStrength.MEDIUM;
        }
        if (length > 12) {
            return types_1.PassStrength.STRENGTH;
        }
    }
    getPassword() {
        return this.password.join("");
    }
    drawNumber(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
exports.default = PasswordsService;
