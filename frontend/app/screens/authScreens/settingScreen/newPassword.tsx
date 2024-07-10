import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Icon from "react-native-vector-icons/FontAwesome";
import Button from "@/components/Button";

type RootStackParamList = {
  password: undefined;
  create: undefined;
  Mdp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "password">;

const validationSchema = z.object({
  password: z.string().min(6, "Require at least 6 characters"),
});

type FormData = z.infer<typeof validationSchema>;

function Password({ navigation }: any) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    navigation.navigate("newpwd");
  };
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require("@/assets/images/react-logo.png")} />
        </View>

        <View className="">
          <View style={styles.enterPassword}>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="New password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showPassword}
                  style={{ height: "100%", width: "100%" }}
                />
              )}
            />
            <Icon
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              color="gray"
              style={styles.eyeIcon}
              onPress={handleTogglePasswordVisibility}
            />
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>
        <View className="">
          <View style={styles.enterPassword}>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Confirm password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showPassword}
                  style={{ height: "100%", width: "100%" }}
                />
              )}
            />
            <Icon
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              color="gray"
              style={styles.eyeIcon}
              onPress={handleTogglePasswordVisibility}
            />
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        <Button title={"Mettre a Jour"} theme="primary" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: "35%",
    width: "100%",
  },
  enterPassword: {
    // width: "100%",
    // justifyContent: "center",
    borderWidth: 1,
    // borderColor: "#7C7C7C",
    // borderRadius: 10,
    // paddingHorizontal: 16,
  },

  errorText: {
    color: "red",
    marginLeft: "4%",
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    top: 20,
  },
});

export default Password;
