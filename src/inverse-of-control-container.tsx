import React, { FC, useContext, ReactNode } from "react";
import { useOnce } from "./use-once";
import { Provider, ReflectiveInjector, Injector } from "injection-js";
import { InjectorContext } from "./injector-context";

export const DIContainer: FC<{
  providers: Provider[];
  children: ReactNode;
}> = ({ children, providers }) => {
  const rootInjector = useContext(InjectorContext) as ReflectiveInjector;
  const contextInjector = useOnce(() => {
    if (rootInjector === Injector.NULL) {
      return ReflectiveInjector.resolveAndCreate(providers);
    }
    return rootInjector.resolveAndCreateChild(providers);
  });
  return (
    <InjectorContext.Provider value={contextInjector}>
      {children}
    </InjectorContext.Provider>
  );
};
