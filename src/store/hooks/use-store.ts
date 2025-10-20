import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { IAction, initialState, reducer } from "../flux";

export type IThemeType =
  | 'dark'
  | 'light'
  | 'green'
  | 'blue'
  | 'purple'
  | 'red'
  | 'yellow'
  | 'pink';

export interface ThemeType {
  type: IThemeType;
  styles: {
    gradient: string;
    background: string;
    text: string;
  };
}

export interface IState {
  people: any[];
  theme: ThemeType;
}

type StoreState = IState & { dispatch: (action: IAction) => void };

const storage = typeof window !== "undefined"
  ? createJSONStorage(() => window.localStorage)
  : createJSONStorage(() => ({
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
    }));

const storeInitializer = (set: any): StoreState => ({
  ...initialState,
  dispatch: ({ type, payload }: IAction) =>
    set(
      (state: IState) => reducer(state, { type, payload }) ?? state,
      true,
      {
        type,
        payload,
      },
    ),
});

export const useStoreHook = create(
  devtools(
    persist(storeInitializer, {
      name: "@boilerplate-reactjs-testes/store",
      storage,
      partialize: (state: StoreState) => ({
        theme: state.theme,
      }),
    }),
  ),
);
