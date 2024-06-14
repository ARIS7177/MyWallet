import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebaseConfig";

import "../global.css";
import AuthNavigator from "./navigations/AuthNavigator";
import TabNavigator from "./navigations/Tabnavigator";
import { PhoneProvider } from "@/lib/PhoneContext";
import { useUser } from "@/stores/user";

enableScreens();

export default function Index() {
  const [appIsReady, setAppIsReady] = useState(false);
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

  const { user, setUser } = useUser();
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        const storedUserPhone = await AsyncStorage.getItem("userPhone");
        if (storedUserPhone) {
          setUser(storedUserPhone);
        } else {
          setUser(null);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        if (fontsLoaded || fontError) {
          setAppIsReady(true);
          console.log(user);
        }
      }
    }
    prepare();
  }, [fontsLoaded, fontError]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer independent={true}>
        <PhoneProvider>
          {user ? <TabNavigator /> : <AuthNavigator />}
        </PhoneProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
