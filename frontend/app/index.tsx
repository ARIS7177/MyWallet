import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";

import { PhoneProvider } from "@/lib/PhoneContext";
import { useUser } from "@/stores/user";
import "../global.css";
import AuthNavigator from "./navigations/AuthNavigator";
import TabNavigator from "./navigations/Tabnavigator";
import NativeWind from "nativewind";
import {
  PhoneAuthCredential,
  getAuth,
  reauthenticateWithCredential,
  signInWithCredential,
  signInWithCustomToken,
} from "firebase/auth";
// import { auth } from "@/firebaseConfig";

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
  // console.log(user);
  useEffect(() => {
    async function prepare() {
      try {
        // Initialisation de NativeWind
        // Vérifier l'état de l'utilisateur avec Firebase Auth
        // onAuthStateChanged(xauth, (currentUser) => {
        //   if (currentUser) {
        //     // Utilisateur connecté, vous pouvez stocker son ID ou autre info si nécessaire
        //     setUser(currentUser.uid);
        //     AsyncStorage.setItem("userPhone", currentUser.phoneNumber || "");
        //   } else {
        //     setUser(null);
        //     AsyncStorage.removeItem("userPhone");
        //   }
        // });
        const storedUser = await AsyncStorage.getItem("user");
        console.log("storedUser", storedUser);
        if (storedUser) {
          const storeUserObject = JSON.parse(storedUser);
          setUser(storeUserObject);
          console.log("user", user);
        } else {
          setUser(null);
        }
      } catch (e) {
        console.warn({ e });
      } finally {
        if (fontsLoaded || fontError) {
          setAppIsReady(true);
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
          {user !== null ? <TabNavigator /> : <AuthNavigator />}
        </PhoneProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
