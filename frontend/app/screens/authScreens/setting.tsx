import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import LogoutButton from "@/components/logoutButton";

const Settings = ({ navigation }: any) => {
  const handlelogout = async () => {};
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("profile")}
          >
            <MaterialIcons name="account-circle" size={30} color="#FFC400" />
            <Text style={styles.textsettings}>My Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("info")}
          >
            <Ionicons name="information-circle" size={30} color="#FFC400" />
            <Text style={styles.textsettings}>Informations</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Language")}
          >
            <MaterialIcons name="translate" size={30} color="#FFC400" />
            <Text style={styles.textsettings}> App language</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("notif")}
          >
            <Ionicons name="notifications" size={30} color="#FFC400" />
            <Text style={styles.textsettings}>Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Service")}
          >
            <Entypo name="help-with-circle" size={30} color="#FFC400" />
            <Text style={styles.textsettings}> Help</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("About")}
          >
            <MaterialIcons name="security" size={30} color="#FFC400" />
            <Text style={styles.textsettings}>About us</Text>
          </TouchableOpacity>

          <LogoutButton />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    gap: 20,
    marginTop: 30,
    //backgroundColor: "white",
    // padding: 1%,
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 15,
  },
  textsettings: {
    fontSize: 18,
    color: "black",
    width: "80%",
  },
  footer: {
    flexDirection: "row",
    padding: 15,
    width: "50%",
    gap: 15,
    alignItems: "center",
  },
});

export default Settings;
