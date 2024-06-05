import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import Signup from "../screens/signup";
import { View } from "react-native";
import Login from "../screens/login";
import ForgetPassword from "../screens/forgetPassword";
import ReceiveSms from "../screens/receiveSms";
import OtpVerification from "../screens/otpVerification";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomePage from "../screens/homePage";
import Transaction from "../screens/transaction";
import CreatePage from "../screens/createPage";
import Stats from "../screens/stats";
import Setting from "../screens/setting";
import TabNavigator from "./Tabnavigator";

export type RootStackParamList = {
  ForgetPassword: undefined;
  "Ouvrir sms": {
    name: string;
    firstname: string;
    phone: string;
    birthday: string;
    statut: string;
    password: string;
    verificationId: any;
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
  TabNavigator: undefined;
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
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
