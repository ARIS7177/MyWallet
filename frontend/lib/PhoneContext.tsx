interface PhoneContextProps {
  phone: string | null;
  setPhone: (phone: string) => void;
}

import { View, Text } from "react-native";
import React, { ReactNode, createContext, useContext, useState } from "react";

export const PhoneContext = createContext<PhoneContextProps | undefined>(
  undefined
);
export const usePhoneContext = () => {
  const context = useContext(PhoneContext);
  if (!context) {
    throw new Error("usePhoneContext must be used within a PhoneProvider");
  }
  return context;
};
export const PhoneProvider = ({ children }: { children: ReactNode }) => {
  const [phone, setPhone] = useState<string | null>(null);
  return (
    <PhoneContext.Provider value={{ phone, setPhone }}>
      {children}
    </PhoneContext.Provider>
  );
};
