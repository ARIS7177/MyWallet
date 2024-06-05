import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/unAuthScreens/HomeScreen";
import Signup from "../screens/unAuthScreens/signup";
import { View } from "react-native";
import Login from "../screens/unAuthScreens/login";
import ForgetPassword from "../screens/unAuthScreens/forgetPassword";
import ReceiveSms from "../screens/unAuthScreens/receiveSms";
import OtpVerification from "../screens/unAuthScreens/otpVerification";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomePage from "../screens/authScreens/homePage";
import Transaction from "../screens/authScreens/transaction";
import CreatePage from "../screens/authScreens/createPage";
import Stats from "../screens/authScreens/stats";
import Setting from "../screens/authScreens/setting";
import TabNavigator, { RootTabParamList } from "./Tabnavigator";
import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  ForgetPassword: undefined;
  "Ouvrir sms": {
    phone: string;
  };
  "Mot de passe oublie": undefined;
  login: undefined;
  Bienvenue: undefined;
  "S'enregistrer": undefined;
  Verification: {
    name: string;
    firstname: string;
    phone: string;
    birthday: string;
    statut: string;
    password: string;
    verificationId: any;
  };
  Main: NavigatorScreenParams<RootTabParamList>;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

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
      <Stack.Screen name="Ouvrir sms" component={ReceiveSms} />
      <Stack.Screen name="Verification" component={OtpVerification} />
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
