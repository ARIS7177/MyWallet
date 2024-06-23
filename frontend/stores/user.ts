import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type IUserState = {
  user: any;
  setUser: (user: any) => void;
};
const useUser = create<IUserState>((set) => ({
  user: null,
  setUser: (user) => {
    AsyncStorage.setItem("user", JSON.stringify(user));
    set(() => ({ user }));
  },
}));

export { useUser };
