import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/unAuthScreens/HomeScreen";
import Signup from "../screens/unAuthScreens/signup";
import { View } from "react-native";
import Login from "../screens/unAuthScreens/login";
import ForgetPassword from "../screens/unAuthScreens/forgetPassword";
import EntryResetCode from "../screens/unAuthScreens/EntryResetCode";
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
import ResetPassword from "../screens/unAuthScreens/resetPassword";

export type RootStackParamList = {
  ForgetPassword: undefined;
  EntryResetCode: {
    phone: string;
    verificationId: any;
  };
  forgetPassword: undefined;
  login: undefined;
  reset: undefined;
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
      <Stack.Screen
        name="reset"
        component={ResetPassword}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="forgetPassword"
        component={ForgetPassword}
        options={{ title: "Mot de passe oublie" }}
      />
      <Stack.Screen
        name="EntryResetCode"
        component={EntryResetCode}
        options={{ title: "Entrez le code" }}
      />
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
