import Budget from "@/app/screens/authScreens/createScreen/budget";
import Category from "@/app/screens/authScreens/createScreen/createCategory";
import Income from "@/app/screens/authScreens/createScreen/income";
import Spend from "@/app/screens/authScreens/createScreen/spend";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface props {
  activeTab: string;
}
const TabsContent = ({ activeTab }: props) => {
  let content;

  switch (activeTab) {
    case "tab1":
      content = <Income />;
      break;
    case "tab2":
      content = <Spend />;
      break;
    case "tab3":
      content = <Budget />;
      break;
    case "tab4":
      content = <Category />;
      break;
    default:
      content = "Select a tab";
  }
  return <View className="w-full ">{content}</View>;
};

const styles = StyleSheet.create({});

export default TabsContent;
