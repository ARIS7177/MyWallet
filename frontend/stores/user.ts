import { create } from "zustand";

type IUserState = {
  user: any | null;
  setUser: (user: any) => void;
};
const useUser = create<IUserState>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));

export { useUser };
