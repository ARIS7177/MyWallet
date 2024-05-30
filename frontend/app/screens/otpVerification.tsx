import Button from "@/components/Button";
// import { FIREBASE_BD } from "@/firebaseConfig";
import auth from "@react-native-firebase/auth";
import { RouteProp, useRoute } from "@react-navigation/native";
// import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { RootStackParamList } from "../navigations/AuthNavigator";
type optVerification = RouteProp<RootStackParamList, "Verification">;

export default function OtpVerification({ navigation }: any) {
  const route = useRoute<optVerification>();
  const { verificationId, name, firstname, phone, birthday, statut, password } =
    route.params;

  const [verificationCode, setVerificationCode] = useState("");
  // const confirmCode = async () => {
  //   try {
  //     const credential = auth.PhoneAuthProvider.credential(
  //       verificationId,
  //       verificationCode
  //     );
  //     const userCredential = await auth().signInWithCredential(credential);

  //     //save userdata in fireStore
  //     await addDoc(collection(FIREBASE_BD, "Users"), {
  //       nom: name,
  //       prenom: firstname,
  //       telephone: phone,
  //       "date de naissance": birthday,
  //       statut: statut,
  //       "mot de passe": password,
  //     });
  //     Alert.alert("inscription reussie");
  //     navigation.navigate("TabNavigator");
  //   } catch (error: any) {
  //     Alert.alert("une erreur est survenue:", error.message);
  //   }
  // };
  return (
    <ScrollView>
      <View className="containerflex-1  gap-10">
        <View className="images  p-0 relative w-full ">
          <Image
            className=" absolute top-0 right-0 max-w-[379] max-h-[379]"
            source={require("../../assets/images/Ellipse.png")}
            resizeMode="cover"
          />
          <Image
            className=" w-full"
            source={require("../../assets/images/verification.png")}
            resizeMode="cover"
          />
        </View>
        <View className="texts  gap-1  px-4 items-center">
          <Text className="title font-helvitica-bold text-4xl text-center text-russian-950">
            Verifier votre numero de téléphone
          </Text>
          <Text className="sub_title text-center  text-lg font-raleway">
            Nous avons envoyer un code au numero{" "}
            <Text className=" font-raleway-bold">{phone}</Text> , Entrer le code
            ci-dessous
          </Text>
        </View>
        <OtpInput
          numberOfDigits={6}
          focusColor="#FFC400"
          focusStickBlinkingDuration={500}
          //   onTextChange={(text) => console.log(text)}
          onFilled={(text) => console.log(`OTP is ${text}`)}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            containerStyle: {
              paddingHorizontal: 20,
            },
            pinCodeContainerStyle: {
              width: 58,
              height: 58,
              borderRadius: 10,
              backgroundColor: "#f6f5fd",
            },
          }}
        />
        <View className="buttons px-4 mt-20">
          <Button
            title="S'incrire"
            theme="primary"
            styleText="text-white"
            // onPress={confirmCode}
          />
          <View className="resend flex-row items-center justify-end gap-1">
            <Text className=" text-gray-400 font-raleway">
              Vous ne trouvez pas de codel?
            </Text>
            <Button
              title="Renvoyer"
              theme="secondary"
              styleText=" text-primary-600 text-sm"
              className="pt-1"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
