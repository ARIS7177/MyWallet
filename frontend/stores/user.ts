import { create } from "zustand";
type IUserState = {
  user?: any;
  setUser: (user: any) => void;
};
const useUser = create<IUserState>((set) => ({
  user: {},
  setUser: (user) => set((state) => ({ user })),
}));

export { useUser };
