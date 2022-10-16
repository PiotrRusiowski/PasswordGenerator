import { PassStrength } from "./types";

export default class Password {
  constructor(
    private password: string[],
    private passwordStrength: PassStrength
  ) {}

  get stringPass() {
    return this.password.join("");
  }

  get passStrength() {
    return this.passwordStrength;
  }
}
