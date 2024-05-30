import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomePage from "../screens/homePage";
import Transaction from "../screens/transaction";
import CreatePage from "../screens/createPage";
import Stats from "../screens/stats";
import Setting from "../screens/setting";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
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
      <Tab.Screen name="home" component={HomePage} />
      <Tab.Screen name="transaction" component={Transaction} />
      <Tab.Screen
        name="create"
        component={CreatePage}
        options={{
          title: "Creer un nouveau status",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen name="category" component={Stats} />
      <Tab.Screen name="stat" component={Stats} />
      <Tab.Screen name="setting" component={Setting} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
