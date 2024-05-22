import { useFonts } from "expo-font";

export const [fontsLoaded] = useFonts({
  "helvitica-light": require("../assets/fonts/helvitica/HelveticaNeueLight.otf"),
  "helvitica-thin": require("../assets/fonts/helvitica/HelveticaNeueThin.otf"),
  "helvitica-medium": require("../assets/fonts/helvitica/HelveticaNeueMedium.otf"),
  "helvitica-bold": require("../assets/fonts/helvitica/HelveticaNeueBold.otf"),
  "Raleway-Regular": require("../assets/fonts/raleway/Raleway-Regular.ttf"),
  "Raleway-Medium": require("../assets/fonts/raleway/Raleway-Medium.ttf"),
  "Raleway-SemiBold": require("../assets/fonts/raleway/Raleway-SemiBold.ttf"),
  "Raleway-Bold": require("../assets/fonts/raleway/Raleway-Bold.ttf"),
});
