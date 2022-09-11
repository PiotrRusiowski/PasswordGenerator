"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PasswordsService {
    constructor() {
        this.password = [];
        this.charGenerator = {
            lowercase: () => String.fromCharCode(this.drawNumber(97, 122)),
            uppercase: () => String.fromCharCode(this.drawNumber(65, 90)),
            symbol: () => String.fromCharCode(this.drawNumber(33, 47)),
            number: () => String.fromCharCode(this.drawNumber(48, 57)),
        };
    }
    passwordGenerator(password) {
        const { properties, length } = password;
        const types = properties
            .filter((prop) => Object.values(prop)[0])
            .map((prop) => Object.keys(prop)[0]);
        for (let i = 0; i < length; i += types.length) {
            // @ts-ignore
            //types.forEach((type) => console.log(this.propGenerator[`${type}`]()));
            types.forEach((type) => {
                // @ts-ignore
                this.password = [...this.password, this.charGenerator[type]()];
            });
        }
        console.log(this.password);
    }
    drawNumber(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
exports.default = PasswordsService;
