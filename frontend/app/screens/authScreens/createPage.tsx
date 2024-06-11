import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Spend from "@/app/screens/authScreens/createScreen/spend";
import Tabs from "./createScreen/tabs";

const CreatePage = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="tabs"
        component={Tabs}
        options={{ headerShown: false, headerTitleAlign: "center" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default CreatePage;
