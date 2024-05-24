import Button from "@/components/Button";
import InputComponent from "@/components/inputComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";
import * as z from "zod";

// Définir le schéma de validation avec Zod
const signUpSchema = z
  .object({
    nom: z.string().min(1, "Nom est requis"),
    prenom: z.string().min(1, "Prénom est requis"),
    phone: z.string().min(9, "Numéro de téléphone invalide").max(9),
    datenaissance: z.string(),
    statut: z.string().min(1, "votre statut professionnel requis"),
    motdepasse: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  })
  .refine((data) => data.motdepasse === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type DataForm = z.infer<typeof signUpSchema>;

export default function Signup() {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setConfirmPassword] = useState("");
  const [datedenaissance, setDatenaissance] = useState("");
  const phoneInputRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = (data: DataForm) => {
    console.log(data);
    // Logique de soumission du formulaire
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
                      type="nom"
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
                      type="prenom"
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
                  type="nom"
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
                      iconStyle="absolute right-3 bottom-4"
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
                      iconStyle=" absolute right-3 bottom-4"
                    />
                  )}
                />
              </View>
            </View>
            <View className="button pt-5">
              <Button
                title="S'inscrire"
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
                  className=" px-0 pt-[6px]"
                  isSocialButton={false}
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
            <Button title="google" theme="icon" isSocialButton />
            <Button title="facebook" theme="icon" isSocialButton />
            <Button title="linkedin" theme="icon" isSocialButton />
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