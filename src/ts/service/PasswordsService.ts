import Password from "../model/Password";
export default class PasswordsService {
  private numbers = new Set<number>();
  private strings = new Set<string>();
  addCharacters(numbers: number[], strings: string[]): void {
    this.numbers = new Set([...this.numbers, ...numbers]);
    this.strings = new Set([...this.strings, ...strings]);
  }
  info() {
    return this.numbers;
  }
  passwordGenerator(password: Password) {}

  private drawIndex(arr: number[]) {
    const min: number = 0;
    const max: number = arr.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
