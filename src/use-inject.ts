import { useContext } from "react";
import { InjectionToken, Type } from "injection-js";
import { InjectorContext } from "./injector-context";

export function useInject<T>(
  token: Type<T> | InjectionToken<T>,
  notFoundValue?: T
): T {
  return useContext(InjectorContext).get(token, notFoundValue);
}
