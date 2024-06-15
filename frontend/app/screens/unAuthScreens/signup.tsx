import Button from "@/components/Button";
import InputComponent from "@/components/inputComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecaptchaVerifier, getAuth } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as z from "zod";

// Définir le schéma de validation avec Zod
const signUpSchema = z
  .object({
    nom: z.string().min(1, "Nom est requis"),
    prenom: z.string().min(1, "Prénom est requis"),
    phone: z.string().min(9, "Numéro de téléphone invalide").max(9),
    datenaissance: z.string().refine(
      (date) => {
        const [month, day, year] = date.split("/").map(Number);
        const birthDate = new Date(year, month - 1, day);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        const m = new Date().getMonth() - birthDate.getMonth();
        return (
          age > 18 ||
          (age === 18 && m >= 0 && new Date().getDate() >= birthDate.getDate())
        );
      },
      {
        message: "Vous devez avoir au moins 18 ans pour vous inscrire.",
      }
    ),
    statut: z.string().min(1, "votre statut professionnel requis"),
    motdepasse: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Le mot de passe doit contenir au moins un symbole spécial."
      ),
    confirmPassword: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Le mot de passe doit contenir au moins un symbole spécial."
      ),
  })
  .refine((data) => data.motdepasse === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      // Vérifier si la date de naissance est fournie et si l'utilisateur a plus de 18 ans
      if (data.datenaissance) {
        const birthDate = new Date(data.datenaissance);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age >= 1;
      }
      return false; // Retourner faux si la date de naissance n'est pas fournie
    },
    {
      message: "Vous devez avoir au moins 18 ans pour vous inscrire",
      path: ["datenaissance"],
    }
  );

type DataForm = z.infer<typeof signUpSchema>;

export default function Signup({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    resolver: zodResolver(signUpSchema),
  });
  // Arrêter le loader si l'utilisateur revient à la page précédente
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(false);
      setError("");
    });

    return unsubscribe;
  }, [navigation]);
  const onSubmit = async (data: DataForm) => {
    setLoading(true);
    setError("");
    const timeoutId = setTimeout(() => {
      setLoading(false);
      setError("La connexion est mauvaise, veuillez réessayer.");
      Alert.alert("Erreur", "La connexion est mauvaise, veuillez réessayer.");
    }, 10000); // 10 seconds timeout
    try {
      // Simulate async operation like API call
      // Replace this setTimeout with actual API call
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));

      clearTimeout(timeoutId); // Clear the timeout if operation is successful

      navigation.navigate("Verification", {
        name: data.nom,
        firstname: data.prenom,
        phone: data.phone,
        birthday: data.datenaissance,
        statut: data.statut,
        password: data.motdepasse,
      });
    } catch (error) {
      clearTimeout(timeoutId); // Clear the timeout if operation fails
      setLoading(false);
      setError("Une erreur s'est produite, veuillez réessayer.");
      Alert.alert("Erreur", "Une erreur s'est produite, veuillez réessayer.");
    }
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="container px-4  gap-10 ">
          <View className="header justify-center items-center mt-5 gap-3">
            <View className="h1_group flex gap-2 items-center">
              <Text className="h1 text-4xl text-primary-600 font-raleway-bold">
                Creez votre compte
              </Text>
              <View className="horizontal_line border-b  border-b-primary-600 w-52"></View>
            </View>
            <Text className="sub text-xl font-raleway text-center">
              Creez votre compte vous jouir pleinement des fonctionnalites de
              l’application
            </Text>
          </View>
          <View className="inputs gap-5">
            <View className="names f flex-row gap-5 justify-between">
              <View className=" flex-1">
                <Controller
                  control={control}
                  name="nom"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputComponent
                      type="default"
                      placeholder="Nom"
                      onChangeText={onChange}
                      secureTextEntry={false}
                      isIcon={false}
                      value={value}
                      errorMessage={errors.nom?.message}
                    />
                  )}
                />
              </View>
              <View className="flex-1">
                <Controller
                  control={control}
                  name="prenom"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputComponent
                      type="default"
                      placeholder="Prénom"
                      onChangeText={onChange}
                      secureTextEntry={false}
                      isIcon={false}
                      value={value}
                      errorMessage={errors.prenom?.message}
                    />
                  )}
                />
              </View>
            </View>
            <Controller
              control={control}
              name="datenaissance"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputComponent
                  type="datenaissance"
                  placeholder="Date de naissance"
                  onChangeText={onChange}
                  secureTextEntry={false}
                  isIcon={false}
                  value={value}
                  errorMessage={errors.datenaissance?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputComponent
                  type="phone"
                  placeholder="numero de telephone"
                  onChangeText={onChange}
                  secureTextEntry={false}
                  isIcon={false}
                  value={value}
                  errorMessage={errors.phone?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="statut"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputComponent
                  type="default"
                  placeholder="Statut professionnel"
                  onChangeText={onChange}
                  secureTextEntry={false}
                  isIcon={false}
                  value={value}
                  errorMessage={errors.statut?.message}
                />
              )}
            />

            <View className="pass flex-row gap-5 justify-between">
              <View className="flex-1">
                <Controller
                  control={control}
                  name="motdepasse"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputComponent
                      type="motdepasse"
                      placeholder="Mot de passe"
                      onChangeText={onChange}
                      secureTextEntry={true}
                      isIcon={true}
                      value={value}
                      errorMessage={errors.motdepasse?.message}
                      iconStyle="absolute right-1 bottom-1 p-2 "
                    />
                  )}
                />
              </View>
              <View className="flex-1">
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
            </View>
            <View className="button pt-5">
              <Button
                title={
                  loading ? (
                    <ActivityIndicator size={"large"} color={"#fff"} />
                  ) : (
                    "S'inscrire"
                  )
                }
                theme="primary"
                className=" justify-center items-center"
                styleText="text-white"
                onPress={handleSubmit(onSubmit)}
              />
              <View className="register flex-row  items-center justify-end">
                <Text className=" text-gray-500 font-raleway text-sm">
                  Avez-vous déja un compte ?{" "}
                </Text>
                <Button
                  title="Se connecter"
                  theme="secondary"
                  styleText="text-primary-600 px-0 py-0 text-sm"
                  className=" pt-2 "
                  isSocialButton={false}
                  onPress={() => navigation.navigate("login")}
                />
              </View>
            </View>
          </View>
          <View className="horizontal_line gap-5 flex-row justify-center items-center w-full">
            <View className="left_line border-b flex-1 border-b-gray-400 w-1/2"></View>
            <View className="separate_word ">
              <Text className=" text-russian-950 text-xl font-raleway-bold">
                Ou
              </Text>
            </View>
            <View className="right_line border-b flex-1 border-b-gray-400"></View>
          </View>
          <View className="social_media flex-row justify-center gap-4 items-center">
            <Button
              title="google"
              theme="icon"
              isSocialButton
              styleText="px-7"
            />
            <Button
              title="facebook"
              theme="icon"
              isSocialButton
              styleText="px-7"
            />
            <Button
              title="linkedin"
              theme="icon"
              isSocialButton
              styleText="px-7"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 20,
    backgroundColor: "red",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#292929",
    height: 59,
    fontFamily: "Raleway-Medium",
    fontSize: 16,
  },
});
