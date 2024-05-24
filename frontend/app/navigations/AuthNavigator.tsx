import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import Signup from "../screens/signup";
import { View } from "react-native";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Bienvenue">
      <Stack.Screen
        name="S'enregistrer"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Bienvenue"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
