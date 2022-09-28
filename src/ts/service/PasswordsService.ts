import { Password } from "../model/types";
import { Property } from "../model/types";
import { charGenerator } from "../model/types";
import { Properties } from "../model/types";

export default class PasswordsService {
  private password: string[] = [];

  passwordGenerator({ properties, length }: Password) {
    this.password = [];
    const types: string[] = Object.entries(properties)
      .filter((el) => el[1])
      .map((el) => el[0]);
    console.log(types);
    for (let i = 0; i < length; i += types.length) {
      types.forEach((type: string) => {
        this.password = [...this.password, this.charGenerator[type]()];
      });
    }
  }

  getPassword() {
    return this.password.join("");
  }

  private charGenerator: charGenerator = {
    [Properties.LOWERCASE]: () => String.fromCharCode(this.drawNumber(97, 122)),
    [Properties.UPPERCASE]: () => String.fromCharCode(this.drawNumber(65, 90)),
    [Properties.SYMBOL]: () => String.fromCharCode(this.drawNumber(33, 47)),
    [Properties.NUMBER]: () => String.fromCharCode(this.drawNumber(48, 57)),
  };
  private drawNumber(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
