import { OperatorFunction, map } from "rxjs";

export function getDataOperator<T>(): OperatorFunction<any, T> {
  return map((response) => response.dados);
}
