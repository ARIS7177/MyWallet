import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomePage from "../screens/authScreens/homePage";
import Transaction from "../screens/authScreens/transaction";
import CreatePage from "../screens/authScreens/createPage";
import Stats from "../screens/authScreens/stats";
import Setting from "../screens/authScreens/setting";
import CustomHeader from "@/components/customHeader";
import SettingNavigator from "./settingNavigation";

const Tab = createBottomTabNavigator();
export type RootTabParamList = {
  home: { phone: string };
  transaction: undefined;
  categorie: undefined;
  creer: undefined;
  stat: undefined;
  parametre: undefined;
};

// Mapping for icons
const iconsMap = {
  home: { library: Ionicons, name: "home-outline" },
  transaction: { library: Ionicons, name: "swap-horizontal-outline" },
  creer: { library: Ionicons, name: "add-circle-outline" },
  categorie: { library: FontAwesome, name: "layers" },
  stat: { library: MaterialIcons, name: "bar-chart" },
  parametre: { library: Ionicons, name: "settings-outline" },
};

const renderIcon = (library, name, size, color) => {
  const IconComponent = library;
  return <IconComponent name={name} size={size} color={color} />;
};

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icon = iconsMap[route.name];
          const iconName = focused ? icon.name : icon.name;
          return renderIcon(icon.library, iconName, focused ? 36 : size, color);
        },
        tabBarActiveTintColor: "#E29800",
        tabBarInactiveTintColor: "gray",
        headerTitleStyle: { flex: 1 },
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
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
        }}
      />
      <Tab.Screen name="stat" component={Stats} />
      <Tab.Screen
        name="parametre"
        component={SettingNavigator}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#ffc400",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            textTransform: "capitalize",
            // color: "#fff",
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
