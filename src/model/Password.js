"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Password {
    constructor(length, uppercase, lowercase, numbers, symbols) {
        this.uppercase = uppercase;
        this.length = length;
        this.symbols = symbols;
        this.lowercase = lowercase;
        this.numbers = numbers;
    }
}
exports.default = Password;
