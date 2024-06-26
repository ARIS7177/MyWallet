import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type IUserState = {
  user: any;
  setUser: (user: any) => void;
};
const useUser = create<IUserState>((set) => ({
  user: null,
  setUser: (user) => {
    const userString = JSON.stringify(user);
    AsyncStorage.setItem("user", userString);
    set(() => ({ user }));
  },
}));

export { useUser };
