import Button from "@/components/Button";
import TabsContent from "@/components/createScreenComponents/tabsContent";
import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <ScrollView>
      <View className=" gap-10 mt-10 justify-centernter">
        <View className="header gap-4">
          <Text className=" text-russian-950 text-center font-helvitica-bold text-3xl">
            Que voulez-vous creer?
          </Text>
          <View
            className="buttons gap-4 flex-row justify-center "
            style={{ height: 60 }}
          >
            <Button
              title="Revenue"
              theme="secondary"
              isComposed={true}
              isActive={activeTab === "tab1"}
              onPress={() => setActiveTab("tab1")}
            />
            <Button
              title="Depense"
              theme="secondary"
              isComposed={true}
              isActive={activeTab === "tab2"}
              onPress={() => setActiveTab("tab2")}
            />
            <Button
              title="Budget"
              theme="secondary"
              isComposed={true}
              isActive={activeTab === "tab3"}
              onPress={() => setActiveTab("tab3")}
            />
            {/* <Button
              title="categorie"
              theme="secondary"
              isComposed
              isActive={activeTab === "tab4"}
              onPress={() => setActiveTab("tab4")}
            /> */}
          </View>
        </View>
        <View className=" w-full">
          <TabsContent activeTab={activeTab} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Tabs;
