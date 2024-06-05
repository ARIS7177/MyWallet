import React, { useEffect, useRef, useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {
  Image,
  ScrollView,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { RootStackParamList } from "../../navigations/AuthNavigator";
import Button from "@/components/Button";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import bcrypt from "react-native-bcrypt";
import {
  FIREBASE_APP,
  FIREBASE_BD,
  PhoneAuthProvider,
  FirebaseRecaptchaVerifierModal,
  auth,
  signInWithCredential,
} from "@/firebaseConfig";
import { StackNavigationProp } from "@react-navigation/stack";

type optVerification = RouteProp<RootStackParamList, "Verification">;
type AuthNavigationPropsStack = StackNavigationProp<RootStackParamList>;
export default function OtpVerification() {
  const navigation = useNavigation<AuthNavigationPropsStack>();
  const route = useRoute<optVerification>();
  const { name, firstname, phone, birthday, statut, password } = route.params;

  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sendVerificationCode = async () => {
      setLoading(true);
      try {
        const phoneProvider = new PhoneAuthProvider(auth);
        const id = await phoneProvider.verifyPhoneNumber(
          `+237${phone}`,
          recaptchaVerifier.current!
        );
        setVerificationId(id);
        setCodeSent(true);
        Alert.alert("Succès", "Le code a été envoyé avec succès !");
        setLoading(false);
      } catch (error: any) {
        console.error("Erreur lors de l'envoi du code:", error);
        setError(`Error: ${error.message}`);
        setLoading(false);
        Alert.alert(
          "Erreur",
          `Erreur lors de l'envoi du code: ${error.message}`
        );
      }
    };

    sendVerificationCode();
  }, [phone]);
  console.log("verificationId: ", verificationId);

  const confirmCode = async () => {
    setLoading(true);
    try {
      if (verificationId) {
        const credential = PhoneAuthProvider.credential(
          verificationId,
          verificationCode
        );
        // Vérifiez le type du mot de passe
        if (typeof password !== "string") {
          throw new Error("Invalid password type");
        }
        // Hashing the password before storing it
        let salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        console.log("hashedPassword", typeof hashedPassword);
        // Vérifiez si hashedPassword est une chaîne de caractères
        if (typeof hashedPassword !== "string") {
          throw new Error(
            "Le mot de passe haché n'est pas une chaîne de caractères"
          );
        }
        setLoading(true);
        await signInWithCredential(auth, credential);
        await setDoc(doc(FIREBASE_BD, "users", `+237${phone}`), {
          name,
          firstname,
          phone: `+237${phone}`,
          birthday,
          statut,
          password: hashedPassword,
        });
        navigation.navigate("Main", { screen: "creer" });
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Erreur lors de la confirmation du code:", error);
      setError(`Error: ${error.message}`);
      Alert.alert(
        "Erreur",
        `Erreur lors de la confirmation du code: ${error.message}`
      );
    }
  };

  const resendCode = async () => {
    setLoading(true);
    setError(null); // Clear any previous error
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const id = await phoneProvider.verifyPhoneNumber(
        `+237${phone}`,
        recaptchaVerifier.current!
      );
      setLoading(false);
      setVerificationId(id);
      Alert.alert("Succès", "Le code a été renvoyé avec succès !");
    } catch (error: any) {
      console.error("Erreur lors de la réexpédition du code:", error);
      setError(`Error: ${error.message}`);
      Alert.alert(
        "Erreur",
        `Erreur lors de la réexpédition du code: ${error.message}`
      );
    }
  };

  return (
    <ScrollView>
      <View className="containerflex-1  gap-10">
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={FIREBASE_APP.options}
        />
        <View className="images  p-0 relative w-full ">
          <Image
            className=" absolute top-0 right-0 max-w-[379] max-h-[379]"
            source={require("../../../assets/images/Ellipse.png")}
            resizeMode="cover"
          />
          <Image
            className=" w-full"
            source={require("../../../assets/images/verification.png")}
            resizeMode="cover"
          />
        </View>
        <View className="texts  gap-1  px-4 items-center">
          <Text className="title font-helvitica-bold text-4xl text-center text-russian-950">
            Verifier votre numero de téléphone
          </Text>
          <Text className="sub_title text-center  text-lg font-raleway">
            Nous avons envoyé un code au numéro{" "}
            <Text className=" font-raleway-bold">{phone}</Text> , Entrez le code
            ci-dessous
          </Text>
        </View>
        <OtpInput
          numberOfDigits={6}
          focusColor="#FFC400"
          focusStickBlinkingDuration={500}
          onFilled={(text) => setVerificationCode(text)}
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
            title={
              loading ? (
                <ActivityIndicator size={"large"} color={"#fff"} />
              ) : (
                "S'inscrire"
              )
            }
            theme="primary"
            styleText="text-white"
            onPress={confirmCode}
          />
          {error && <Text className=" text-red-500">{error}</Text>}
          <View className="resend flex-row items-center justify-end gap-1">
            <Text className=" text-gray-400 font-raleway">
              Vous ne trouvez pas de code?
            </Text>
            <Button
              title="Renvoyer"
              theme="secondary"
              styleText=" text-primary-600 text-sm"
              className="pt-1"
              onPress={resendCode}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
