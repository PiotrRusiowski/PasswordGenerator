"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PasswordsService {
    constructor() {
        this.numbers = new Set();
        this.strings = new Set();
    }
    addCharacters(numbers, strings) {
        this.numbers = new Set([...this.numbers, ...numbers]);
        this.strings = new Set([...this.strings, ...strings]);
    }
    info() {
        return this.numbers;
    }
    passwordGenerator(password) { }
    drawIndex(arr) {
        const min = 0;
        const max = arr.length - 1;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
exports.default = PasswordsService;
