export default class Password {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  constructor(
    length: number,
    uppercase: boolean,
    lowercase: boolean,
    numbers: boolean,
    symbols: boolean
  ) {
    this.uppercase = uppercase;
    this.length = length;
    this.symbols = symbols;
    this.lowercase = lowercase;
    this.numbers = numbers;
  }
}
