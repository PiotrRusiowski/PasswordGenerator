import { Password } from "../model/Password";
import { Property } from "../model/Password";
import { charGenerator } from "../model/Password";
export default class PasswordsService {
  private password: string[] = [];
  private charGenerator: charGenerator = {
    lowercase: () => String.fromCharCode(this.drawNumber(97, 122)),
    uppercase: () => String.fromCharCode(this.drawNumber(65, 90)),
    symbol: () => String.fromCharCode(this.drawNumber(33, 47)),
    number: () => String.fromCharCode(this.drawNumber(48, 57)),
  };

  passwordGenerator(password: Password) {
    const { properties, length } = password;
    const types: string[] = properties
      .filter((prop) => Object.values(prop)[0])
      .map((prop: Property) => Object.keys(prop)[0]);
    for (let i = 0; i < length; i += types.length) {
      // @ts-ignore
      //types.forEach((type) => console.log(this.propGenerator[`${type}`]()));
      types.forEach((type) => {
        // @ts-ignore
        this.password = [...this.password, this.charGenerator[type]()];
      });
    }
    console.log(this.password);
  }

  private drawNumber(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
