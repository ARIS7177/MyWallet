import React from "react";
import { View, Text } from "react-native";
import { signOut } from "firebase/auth";
import LogoutButton from "@/components/logoutButton";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootTabParamList } from "@/app/navigations/Tabnavigator";

type homePageProp = RouteProp<RootTabParamList, "home">;
export default function HomePage() {
  const route = useRoute<homePageProp>();
  // const { phone } = route.params;
  return (
    <View>
      <Text>Home page</Text>
      {/* <Text>{phone}</Text> */}
      <LogoutButton />
    </View>
  );
}
