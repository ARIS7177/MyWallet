import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import Signup from "../screens/signup";
import { View } from "react-native";
import Login from "../screens/login";
import ForgetPassword from "../screens/forgetPassword";

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
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Mot de passe oublie" component={ForgetPassword} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
