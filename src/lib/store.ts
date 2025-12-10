import { create } from 'zustand';

export interface Store {
  allModels: string[];
  setAllModels: (models: string[]) => void;
}

export const useStore = create<Store>()((set) => ({
  allModels: [],
  setAllModels: (models) =>
    set((state) => ({
      allModels: Array.from(new Set([...state.allModels, ...models])),
    })),
}));
