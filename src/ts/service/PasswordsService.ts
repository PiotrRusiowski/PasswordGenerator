import { Password } from "../model/types";
import { Property } from "../model/types";
import { charGenerator } from "../model/types";
import { Properties } from "../model/types";
import { PropertiesNames } from "../model/types";

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
    this.password = [];
    const types: string[] = properties
      .filter((prop) => Object.values(prop)[0])
      .map((prop: Property) => Object.keys(prop)[0]);
    for (let i = 0; i < length; i += types.length) {
      types.forEach((type: string) => {
        this.password = [...this.password, this.charGenerator[type]()];
      });
    }
  }
  getPassword(): string {
    console.log(this.password.join(""));
    return this.password.join("");
  }

  private drawNumber(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
