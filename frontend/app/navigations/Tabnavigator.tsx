import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomePage from "../screens/authScreens/homePage";
import Transaction from "../screens/authScreens/transaction";
import CreatePage from "../screens/authScreens/createPage";
import Stats from "../screens/authScreens/stats";
import Setting from "../screens/authScreens/setting";
import CustomHeader from "@/components/customHeader";

interface Props {
  iconType?: "FontAwesome" | "MaterialIcons" | "Ionicons";
}
const Tab = createBottomTabNavigator();
export type RootTabParamList = {
  home: { phone: string };
  transaction: undefined;
  categorie: undefined;
  creer: undefined;
  stat: undefined;
  parametre: undefined;
};

function TabNavigator({ iconType = "Ionicons" }: Props) {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "transaction":
              iconName = focused
                ? "swap-horizontal"
                : "swap-horizontal-outline";
              break;
            case "create":
              iconName = focused ? "add-circle" : "add-circle-outline";
              break;
            case "category":
              iconName = focused ? "layers" : "layers-outline";
              break;
            case "stat":
              iconName = focused ? "bar-chart" : "bar-chart-outline";
              break;
            case "setting":
              iconName = focused ? "settings" : "settings-outline";
              break;
            default:
              iconName = "alert-circle";
              break;
          }
          return (
            <Icon name={iconName} size={focused ? 36 : size} color={color} />
          );
        },
        tabBarActiveTintColor: "#E29800",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="transaction" component={Transaction} />
      <Tab.Screen
        name="creer"
        component={CreatePage}
        options={{
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="home"
        component={HomePage}
        options={{ headerShown: true, headerTitle: () => <CustomHeader /> }}
      />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Parametres" component={Setting} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
