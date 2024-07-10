import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/authScreens/settingScreen/profile";
import Settings from "../screens/authScreens/setting";
import Password from "../screens/authScreens/settingScreen/newPassword";

export type RootStackParamList = {
  profile: undefined;
  setting: undefined;
  newPassword: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

function SettingNavigator() {
  return (
    <Stack.Navigator initialRouteName="setting">
      <Stack.Screen
        name={"setting"}
        component={Settings}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={"profile"}
        component={Profile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={"newPassword"}
        component={Password}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default SettingNavigator;
