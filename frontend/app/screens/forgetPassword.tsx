import Button from "@/components/Button";
import InputComponent from "@/components/inputComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  const [phone, setPhone] = useState("");
  const phoneInputRef = useRef(null);
  const onSubmit = (data: FormData) => {
    console.log(data);
    // Logique de soumission du formulaire
  };
  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="container">
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
              <Text className="text-center px-10">
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
