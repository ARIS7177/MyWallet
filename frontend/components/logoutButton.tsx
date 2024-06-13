import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";
import React from "react";
import { Alert, Text, View } from "react-native";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";
import { StackNavigationProp } from "@react-navigation/stack";

type AuthNavigationProps = StackNavigationProp<RootStackParamList>;
const LogoutButton = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const handleLogout = async () => {
    try {
      // Naviguer vers l'écran de connexion ou l'écran d'accueil après la déconnexion
      navigation.navigate("login");
      await signOut(auth);
      Alert.alert("Succès", "Déconnexion réussie !");
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
