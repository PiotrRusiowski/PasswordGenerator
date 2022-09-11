export enum Properties {
  UPPERCASE = "uppercase",
  LOWERCASE = "lowercase",
  NUMBER = "number",
  SYMBOL = "symbol",
}
export interface Property {
  [key: string]: boolean;
}
export interface charGenerator {
  [key: string]: Function;
}
export interface Password {
  length: number;
  properties: Property[];
}
