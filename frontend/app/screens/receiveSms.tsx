import Button from "@/components/Button";
import React, { useState } from "react";
import { View, Image, Text, Alert } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/AuthNavigator";
// import {
//   FIREBASE_APP,
//   PhoneAuthProvider,
//   auth,
//   signInWithPhoneNumber,
// } from "../../firebaseConfig";
type receiveSmsProp = RouteProp<RootStackParamList, "Ouvrir sms">;

export default function ReceiveSms({ navigation }: any) {
  // const navigation = useNavigation()
  const route = useRoute<receiveSmsProp>();
  const { name, firstname, phone, birthday, statut, password } = route.params;
  const [verificationId, setVerificationId] = useState(null);

  // const sendVerification = async () => {
  //   try {
  //     const phoneProvider = new PhoneAuthProvider(auth)
  //     // const confirmationResult = await signInWithPhoneNumber(auth,phone);
  //     // setVerificationId(confirmationResult.verificationId);
  //     Alert.alert("Un code de verification a ete envoye sur votre telephone");
  //   } catch (error: any) {
  //     Alert.alert(
  //       "une erreur est survrnue lors de l'envoie du code de verification:",
  //       error.message
  //     );
  //   }
  // };

  // const handleNext = () => {
  //   navigation.navigate("Verification", {
  //     verificationId,
  //     name,
  //     firstname,
  //     phone,
  //     birthday,
  //     statut,
  //     password,
  //   });
  // };
  return (
    <View className="container flex-1 justify-between mb-10">
      <View className="header gap-5">
        <View className="images  p-0 relative w-full ">
          <Image
            className=" absolute top-0 right-0 max-w-[379] max-h-[379]"
            source={require("../../assets/images/Ellipse.png")}
            resizeMode="cover"
          />
          <Image
            className=" w-full"
            source={require("../../assets/images/sms.png")}
          />
        </View>
        <View className="text">
          <Text className="text-center px-10 font-raleway-medium text-lg">
            Nous vous avons envoyer les instructions pour renitialiser votre mot
            de passe par sms au :{" "}
            <Text className=" font-helvitica-bold">{phone}</Text>.
          </Text>
        </View>
      </View>
      <View className="button px-4">
        <Button
          title={verificationId ? "Suivant" : "Envoyer le code"}
          theme="primary"
          isSocialButton={false}
          styleText="text-white"
          // onPress={}
        />
        <View className="resend flex-row justify-end items-center gap-3">
          <Text className="text-sm">Vous ne trouvez pas de code ?</Text>
          <Button
            title="Resend"
            theme="secondary"
            styleText="text-primary-600 text-sm"
          />
        </View>
      </View>
    </View>
  );
}
