import create from "zustand";

const useStore = create((set) => ({
  step: 0,
  incrementStep: () => set((state) => ({ step: state.step + 1 })),
  inputStore: "",
  changeInput: (input) => set(() => ({ inputStore: input })),
}));

export default useStore;
