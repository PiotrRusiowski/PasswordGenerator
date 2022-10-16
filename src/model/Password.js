"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Password {
    constructor(password, passwordStrength) {
        this.password = password;
        this.passwordStrength = passwordStrength;
    }
    get stringPass() {
        return this.password.join("");
    }
    get passStrength() {
        return this.passwordStrength;
    }
}
exports.default = Password;
