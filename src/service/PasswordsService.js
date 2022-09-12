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
    passwordGenerator(password) {
        const { properties, length } = password;
        const types = properties
            .filter((prop) => Object.values(prop)[0])
            .map((prop) => Object.keys(prop)[0]);
        for (let i = 0; i < length; i += types.length) {
            types.forEach((type) => {
                this.password = [...this.password, this.charGenerator[type]()];
            });
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
