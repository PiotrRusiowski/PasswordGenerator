"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PasswordsService {
    passwordGenerator(password) {
        const types = password.properties.filter((prop) => Object.values(prop)[0]);
        console.log(types);
        return new Array(password.length).fill(types.map((el) => el));
    }
    getLowercase() {
        return String.fromCharCode(this.drawNumber(97, 122));
    }
    getSymbol() {
        return String.fromCharCode(this.drawNumber(33, 47));
    }
    drawNumber(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    charactersQuantity(properties) {
        const propertiesQuantity = properties.filter((property) => property).length;
    }
}
exports.default = PasswordsService;
