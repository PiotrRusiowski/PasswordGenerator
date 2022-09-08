import { Password } from "../model/Password";
import { Property } from "../model/Password";
export default class PasswordsService {
  passwordGenerator(password: Password) {
    const types: Property[] = password.properties.filter(
      (prop) => Object.values(prop)[0]
    );
    console.log(types);
    return new Array(password.length).fill(types.map((el) => el));
  }

  private getLowercase() {
    return String.fromCharCode(this.drawNumber(97, 122));
  }
  private getSymbol() {
    return String.fromCharCode(this.drawNumber(33, 47));
  }
  private drawNumber(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  charactersQuantity(properties: boolean[]) {
    const propertiesQuantity: number = properties.filter(
      (property) => property
    ).length;
  }
}
