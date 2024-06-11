import Button from "@/components/Button";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AuthNavigator";
import { OtpInput } from "react-native-otp-entry";
import {
  PhoneAuthProvider,
  auth,
  signInWithCredential,
} from "@/firebaseConfig";
import { set } from "react-hook-form";

// import {
//   FIREBASE_APP,
//   PhoneAuthProvider,
//   auth,
//   signInWithPhoneNumber,
// } from "../../firebaseConfig";
type receiveSmsProp = RouteProp<RootStackParamList, "EntryResetCode">;
type AuthNavigationProps = NavigationProp<RootStackParamList>;

export default function ReceiveSms() {
  const navigation = useNavigation<AuthNavigationProps>();
  const route = useRoute<receiveSmsProp>();
  let { phone, verificationId } = route.params;
  const [codeSent, setCodeSent] = useState("");
  const [isLoading, setLoading] = useState(false);
  const recaptchaVerifier = useRef(null);

  const handleVerifyCode = async () => {
    try {
      setLoading(true);
      const credential = PhoneAuthProvider.credential(verificationId, codeSent);
      await signInWithCredential(auth, credential);
      navigation.navigate("reset");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert("Erreur", error.message);
    }
  };

  const resendCode = async () => {
    try {
      setLoading(true);
      const phoneProvider = new PhoneAuthProvider(auth);
      const id = await phoneProvider.verifyPhoneNumber(
        `+237${phone}`,
        recaptchaVerifier.current!
      );
      setLoading(false);
      verificationId = id;
      Alert.alert("Succès", "Le code a été renvoyé avec succès !");
    } catch (error: any) {
      setLoading(false);
      console.error("Erreur lors de la réexpédition du code:", error);
      Alert.alert(
        "Erreur",
        `Erreur lors de la réexpédition du code: ${error.message}`
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
      <ScrollView>
        <View className="container flex-1 justify-between mb-10 gap-5">
          <View className="header gap-5">
            <View className="images  p-0 relative w-full ">
              <Image
                className=" absolute top-0 right-0 max-w-[379] max-h-[379]"
                source={require("../../../assets/images/Ellipse.png")}
                resizeMode="cover"
              />
              <Image
                className=" w-full"
                source={require("../../../assets/images/sms.png")}
              />
            </View>

            <View className="text">
              <Text className="text-center px-10 font-raleway-medium text-lg">
                Nous vous avons envoyer les instructions pour renitialiser votre
                mot de passe par sms au :{" "}
                <Text className=" font-helvitica-bold">{phone}</Text>.
              </Text>
            </View>
          </View>
          <View className="input">
            <OtpInput
              numberOfDigits={6}
              focusColor="#FFC400"
              focusStickBlinkingDuration={500}
              onFilled={(text) => setCodeSent(text)}
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
          </View>
          <View className="button px-4">
            <Button
              title={
                isLoading ? (
                  <ActivityIndicator size={"large"} color={"#bb6c02"} />
                ) : (
                  "Suivant"
                )
              }
              theme="primary"
              isSocialButton={false}
              styleText="text-white"
              onPress={handleVerifyCode}
            />
            <View className="resend flex-row justify-end items-center gap-3">
              <Text className="text-sm">Vous ne trouvez pas de code ?</Text>
              <Button
                title={
                  isLoading ? (
                    <ActivityIndicator size={"large"} color={"#bb6c02"} />
                  ) : (
                    "Resend"
                  )
                }
                theme="secondary"
                styleText="text-primary-600 text-sm"
                onPress={resendCode}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
