import { Password } from "../model/Password";
import { Property } from "../model/Password";
import { charGenerator } from "../model/Password";
import { Properties } from "../model/Password";
import { PropertiesNames } from "../model/Password";

export default class PasswordsService {
  private password: string[] = [];
  private charGenerator: charGenerator = {
    [Properties.LOWERCASE]: () => String.fromCharCode(this.drawNumber(97, 122)),
    [Properties.UPPERCASE]: () => String.fromCharCode(this.drawNumber(65, 90)),
    [Properties.SYMBOL]: () => String.fromCharCode(this.drawNumber(33, 47)),
    [Properties.NUMBER]: () => String.fromCharCode(this.drawNumber(48, 57)),
  };

  passwordGenerator(password: Password) {
    const { properties, length } = password;
    const types: string[] = properties
      .filter((prop) => Object.values(prop)[0])
      .map((prop: Property) => Object.keys(prop)[0]);
    for (let i = 0; i < length; i += types.length) {
      types.forEach((type: string) => {
        this.password = [...this.password, this.charGenerator[type]()];
      });
    }
  }
  private getPassword(): string {
    return this.password.join("");
  }

  private drawNumber(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
