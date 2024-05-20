import { Depedency } from "../shared";

export const reactive = <T>(value: T) => {
  return new Depedency(value);
};
