import React from "react";
import { View, Text } from "react-native";
import { signOut } from "firebase/auth";
import LogoutButton from "@/components/logoutButton";

export default function HomePage() {
  return (
    <View>
      <Text>Home page</Text>
      <LogoutButton />
    </View>
  );
}
