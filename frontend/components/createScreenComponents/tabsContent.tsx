import Budget from "@/app/screens/createScreen/budget";
import Category from "@/app/screens/createScreen/createCategory";
import Income from "@/app/screens/createScreen/income";
import Spend from "@/app/screens/createScreen/spend";
import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface props {
  activeTab: string;
}
const TabsContent = ({ activeTab }: props) => {
  let content;

  switch (activeTab) {
    case "tab1":
      content = <Spend />;
      break;
    case "tab2":
      content = <Income />;
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
