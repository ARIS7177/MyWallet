import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React from "react";
import InputComponent from "@/components/inputComponent";
import * as zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { auth } from "@/firebaseConfig";
import { updatePassword } from "firebase/auth";
import bcrypt from "react-native-bcrypt";
import { RootStackParamList } from "@/app/navigations/AuthNavigator";

const passSchema = zod
  .object({
    password: zod
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Le mot de passe doit contenir au moins un symbole spécial."
      ),
    confirmPassword: zod
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Le mot de passe doit contenir au moins un symbole spécial."
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type FormData = zod.infer<typeof passSchema>;
type AuthNavigationProps = NavigationProp<RootStackParamList>;
const ResetPassword = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(passSchema) });
  const navigation = useNavigation<AuthNavigationProps>();

  const handleResetPassword = async (data: FormData) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(data.password, salt);
        await updatePassword(user, hashPassword);
        Alert.alert("Succès", "Votre mot de passe a été mis à jour");
        navigation.navigate("login");
      } else {
        Alert.alert("Erreur", "Aucun utilisateur connecté");
      }
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    }
  };
  return (
    <ScrollView>
      <TouchableNativeFeedback onPress={Keyboard.dismiss}>
        <View className="container flex-1 gap-10">
          <View className="header justify-center">
            <Text className="text-4xl font-helvitica-bold">
              Creer un nouveau nom de passe
            </Text>
            <Text className="text-sm font-raleway">
              Votre nouveau mot de passe doit etre different de l’ancien
            </Text>
          </View>
          <View className="inputs gap-5">
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputComponent
                  type="motdepasse"
                  placeholder="Mot de passe"
                  onChangeText={onChange}
                  secureTextEntry={true}
                  isIcon={true}
                  value={value}
                  errorMessage={errors.password?.message}
                  iconStyle="absolute right-1 bottom-1 p-2 "
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputComponent
                  type="motdepasse"
                  placeholder="confirmer Mot de passe"
                  onChangeText={onChange}
                  secureTextEntry={true}
                  isIcon={true}
                  value={value}
                  errorMessage={errors.confirmPassword?.message}
                  iconStyle=" absolute right-1 bottom-1 p-2 "
                />
              )}
            />
          </View>
          <Button
            title={"Renitialiser"}
            theme="primary"
            styleText=" text-white"
            onPress={handleResetPassword}
          />
        </View>
      </TouchableNativeFeedback>
    </ScrollView>
  );
};

export default ResetPassword;
