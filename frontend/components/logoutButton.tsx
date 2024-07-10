import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";
import React from "react";
import { Alert, Text, View } from "react-native";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "@/stores/user";

type AuthNavigationProps = StackNavigationProp<RootStackParamList>;
const LogoutButton = () => {
  const setUser = useUser((state) => state.setUser);
  const navigation = useNavigation<AuthNavigationProps>();
  const handleLogout = async () => {
    try {
      // Naviguer vers l'écran de connexion ou l'écran d'accueil après la déconnexion
      setUser(null);
      await AsyncStorage.removeItem("user");
      await signOut(auth);
      // navigation.navigate("login");
      navigation.reset({
        index: 0,
        routes: [{ name: "login" }],
      });
    } catch (error: any) {
      Alert.alert("Erreur", `Erreur lors de la déconnexion: ${error.message}`);
    }
  };
  return (
    <Button
      title="Se déconnecter"
      onPress={handleLogout}
      theme="danger"
      styleText="text-white"
    />
  );
};

export default LogoutButton;
