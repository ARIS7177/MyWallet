import Button from "@/components/Button";
import InputComponent from "@/components/inputComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/AuthNavigator";
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
import * as zod from "zod";

const PhoneSchema = zod.object({
  phone: zod.string().min(9, "Numéro de téléphone invalide").max(9),
});

type FormData = zod.infer<typeof PhoneSchema>;

export default function ForgetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(PhoneSchema) });
  const onSubmit = (data: FormData) => {
    console.log(data);
    navigation.navigate("Ouvrir sms", { phone: data.phone });

    // Logique de soumission du formulaire
  };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ScrollView className="w-full">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
        <View className="container flex-1 h-full">
          <View className="images  p-0 relative w-full ">
            <Image
              className=" absolute top-0 right-0 max-w-[379] max-h-[379]"
              source={require("../../assets/images/Ellipse.png")}
              resizeMode="cover"
            />
            <Image
              className=" w-full"
              source={require("../../assets/images/Forgot password-bro.png")}
            />
          </View>
          <View className="body gap-10 p-4 ">
            <View className="text gap-10">
              <Text className="text-center px-10 font-raleway-medium">
                Entrez votre numero d’inscription ci-dessous pour recevoir des
                instructions de renitialisation de mot de passe
              </Text>
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputComponent
                    type="phone"
                    placeholder="numero de telephone"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.phone?.message}
                    isIcon={false}
                    secureTextEntry={false}
                  />
                )}
              />
            </View>
            <View className="button">
              <Button
                title="Envoyer"
                theme="primary"
                isSocialButton={false}
                onPress={handleSubmit(onSubmit)}
                styleText="text-white"
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}
