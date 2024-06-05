import Button from "@/components/Button";
import InputComponent from "@/components/inputComponent";
import { FIREBASE_BD, auth } from "@/firebaseConfig";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View, Image, Text } from "react-native";
import * as z from "zod";
import { doc, getDoc } from "firebase/firestore";

const signInSchema = z.object({
  phone: z.string().min(9, "Numéro de téléphone invalide").max(9),
  motdepasse: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

type DataForm = z.infer<typeof signInSchema>;

export default function Login({ navigation }: any) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DataForm>({
    resolver: zodResolver(signInSchema),
  });
  const onSubmit = (data: DataForm) => {
    console.log(data);
    // Logique de soumission du formulaire
  };

  const handleLogin = async () => {
    try {
      const userDoc = await getDoc(doc(FIREBASE_BD, "users", phone));
      if (userDoc.exists()) {
        const userData = userDoc.data();
      }
    } catch (error) {}
  };

  return (
    <ScrollView>
      <View className="container">
        <View className="images  p-0 relative w-full -mt-10">
          <Image
            className=" absolute top-0 right-0 max-w-[379] max-h-[379]"
            source={require("../../assets/images/Ellipse.png")}
            resizeMode="cover"
          />
          <Image
            className=" w-full"
            source={require("../../assets/images/women_seat.png")}
          />
        </View>
        <View className="container_body gap-5">
          <View className="header justify-center items-center gap-3 px-4">
            <View className="h1_group flex gap-2 items-center">
              <Text className="h1 text-4xl text-primary-600 font-raleway-bold">
                Se connecter maintenant
              </Text>
              <View className="horizontal_line border-b  border-b-primary-600 w-52"></View>
            </View>
            <Text className="sub text-xl font-raleway text-center">
              Bon retour, vous nous avez manquer !!!
            </Text>
          </View>

          <View className="inputs px-4 gap-3">
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputComponent
                  type="phone"
                  placeholder="numero de telephone"
                  onChangeText={onChange}
                  secureTextEntry={false}
                  isIcon={true}
                  value={false}
                  errorMessage={errors.phone?.message}
                />
              )}
            />

            <View className="forget_password ">
              <Controller
                name="motdepasse"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputComponent
                    type="motdepasse"
                    placeholder="Mot de passe"
                    onChangeText={onChange}
                    secureTextEntry
                    isIcon
                    errorMessage={errors.motdepasse?.message}
                    className="relative"
                    iconStyle="absolute right-5 bottom-2 p-2"
                  />
                )}
              />
              <Button
                title="Mot de passe oublié ?"
                theme="secondary"
                isSocialButton={false}
                styleText="text-sm text-primary-600 self-end px-0"
                className=" px-0"
                onPress={() => navigation.navigate("Mot de passe oublie")}
              />
            </View>
          </View>

          <View className="button  px-4">
            <Button
              title="Se connecter"
              theme="primary"
              className=" justify-center items-center"
              styleText="text-white"
              onPress={handleSubmit(onSubmit)}
            />
            <View className="login flex-row  items-center justify-end ">
              <Text className=" text-gray-500 font-raleway text-sm">
                Vous n’avez pas encore de compte ?{" "}
              </Text>
              <Button
                title="S'inscrire"
                theme="secondary"
                styleText="text-primary-600 px-0 py-0 text-sm"
                className=" pt-2 "
                isSocialButton={false}
                onPress={() => navigation.navigate("S'enregistrer")}
              />
            </View>
          </View>

          <View className="horizontal_line gap-5 flex-row justify-center items-center w-full ">
            <View className="left_line border-b  border-b-gray-400 flex-1"></View>
            <View className="separate_word ">
              <Text className=" text-russian-950 text-xl font-raleway-bold">
                Ou
              </Text>
            </View>
            <View className="right_line border-b flex-1 w-10 border-b-gray-400"></View>
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
      </View>
    </ScrollView>
  );
}
