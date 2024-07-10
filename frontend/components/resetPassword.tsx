import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import Button from "@/components/Button";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ResetPassword({ navigation }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = () => {
    if (newPassword === confirmPassword) {
      // Handle password reset logic
      alert("Password reset successfully!");
      navigation.goBack();
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showPassword}
          />
          <Icon
            name={showPassword ? "eye-slash" : "eye"}
            size={20}
            color="gray"
            style={styles.eyeIcon}
            onPress={handleTogglePasswordVisibility}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
          />
          <Icon
            name={showPassword ? "eye-slash" : "eye"}
            size={20}
            color="gray"
            style={styles.eyeIcon}
            onPress={handleTogglePasswordVisibility}
          />
        </View>
        <Button
          title="Reset Password"
          customStyle={styles.button}
          customStyleText={styles.textButton}
          onPress={handleResetPassword}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F6F5FD",
    borderRadius: 10,
    backgroundColor: "#F6F5FD",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 50,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  textButton: {
    color: "#FFF",
    fontSize: 16,
  },
});
