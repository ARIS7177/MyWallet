import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";

import "../global.css";
import AuthNavigator from "./navigations/AuthNavigator";

SplashScreen.preventAutoHideAsync();

enableScreens();
export default function Index() {
  const [fontsLoaded, fontError] = useFonts({
    "helvitica-light": require("../assets/fonts/helvitica/HelveticaNeueLight.otf"),
    "helvitica-thin": require("../assets/fonts/helvitica/HelveticaNeueThin.otf"),
    "helvitica-medium": require("../assets/fonts/helvitica/HelveticaNeueMedium.otf"),
    "helvitica-bold": require("../assets/fonts/helvitica/HelveticaNeueBold.otf"),
    "Raleway-Regular": require("../assets/fonts/raleway/Raleway-Regular.ttf"),
    "Raleway-Medium": require("../assets/fonts/raleway/Raleway-Medium.ttf"),
    "Raleway-SemiBold": require("../assets/fonts/raleway/Raleway-SemiBold.ttf"),
    "Raleway-Bold": require("../assets/fonts/raleway/Raleway-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer independent={true}>
        <AuthNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
