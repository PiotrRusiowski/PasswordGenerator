import {
  charGenerator,
  PassStrength,
  PasswordProperties,
  Properties,
  Password,
} from "../model/types";

export default class PasswordsService {
  private password: string[] = [];

  passwordGenerator({ properties, length }: PasswordProperties): string {
    this.password = [];
    let generatedPassword = [] as string[];
    const types: string[] = Object.entries(properties)
      .filter((el) => el[1])
      .map((el) => el[0]);

    for (let i = 0; i < length; i += types.length) {
      types.forEach((type: string) => {
        generatedPassword = [...generatedPassword, this.charGenerator[type]()];
      });
    }
    this.password = generatedPassword.slice(0, length);

    return this.password.join("");
  }

  static passwordStrength(length: number) {
    if (length >= 4 && length <= 6) {
      return PassStrength.WEAK;
    }
    if (length > 6 && length <= 12) {
      return PassStrength.MEDIUM;
    }
    if (length > 12) {
      return PassStrength.STRENGTH;
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
