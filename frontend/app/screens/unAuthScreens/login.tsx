import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/Button";
import InputComponent from "@/components/inputComponent";
import {
  FIREBASE_APP,
  FIREBASE_BD,
  FirebaseRecaptchaVerifierModal,
  PhoneAuthProvider,
  auth,
  signInWithCredential,
  signInWithPhoneNumber,
} from "@/firebaseConfig";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  View,
  Image,
  Text,
  Alert,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import * as z from "zod";
import { doc, getDoc } from "firebase/firestore";
import bcrypt from "react-native-bcrypt";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootTabParamList } from "../../navigations/Tabnavigator";
import { RootStackParamList } from "../../navigations/AuthNavigator";
import { PhoneContext, usePhoneContext } from "@/lib/PhoneContext";
import { OtpInput } from "react-native-otp-entry";
import { useVerificationId } from "@/stores/verificationId";

const signInSchema = z.object({
  phone: z.string().min(9, "Numéro de téléphone invalide").max(9),
  motdepasse: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

type DataForm = z.infer<typeof signInSchema>;
type AuthNavigationPropsStack = StackNavigationProp<RootStackParamList>;

export default function Login() {
  const navigation2 = useNavigation<AuthNavigationPropsStack>();
  const [code, setCode] = useState("");

  const { setPhone } = usePhoneContext();
  const [loading, setLoading] = useState(false);
  const recaptchaVerifier = useRef(null);
  const [error, setError] = useState<string | null>(null);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  // const { verificationId, setVerificationId } = useVerificationId();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DataForm>({
    resolver: zodResolver(signInSchema),
  });

  const handleLogin = async (data: DataForm) => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
      setError("La connexion est mauvaise, veuillez réessayer.");
      Alert.alert("Erreur", "La connexion est mauvaise, veuillez réessayer.");
    }, 50000); // 30 seconds timeout
    console.log(data);
    try {
      setLoading(true);
      setPhone(data.phone);
      // Récupérez le document utilisateur à partir de Firestore en utilisant le numéro de téléphone
      const userDoc = await getDoc(
        doc(FIREBASE_BD, "users", `+237${data.phone}`)
      );
      if (userDoc.exists()) {
        setLoading(false);
        const userData = userDoc.data();
        // Vérifiez le mot de passe haché
        const passwordMatch = bcrypt.compareSync(
          data.motdepasse,
          userData.password
        );
        if (passwordMatch) {
          // Step 1: Verify the phone number with reCAPTCHA
          const phoneProvider = new PhoneAuthProvider(auth);
          const verificationId = await phoneProvider.verifyPhoneNumber(
            `+237${data.phone}`,
            recaptchaVerifier.current!
          );
          setVerificationId(verificationId);
          console.log(verificationId);
        } else {
          Alert.alert("Erreur", "Mot de passe incorect.");
        }
      } else {
        Alert.alert("Erreur", "L'utilisateur est introuvable");
        setLoading(false);
      }
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));
      clearTimeout(timeoutId); // Clear the timeout if operation is successful
    } catch (error: any) {
      clearTimeout(timeoutId); // Clear the timeout if operation fails
      Alert.alert("Erreur", error.message);
      setLoading(false);
    }
  };

  const confirmCode = async (data: DataForm) => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
      setError("La connexion est mauvaise, veuillez réessayer.");
      Alert.alert("Erreur", "La connexion est mauvaise, veuillez réessayer.");
    }, 50000); // 30 seconds timeout
    setLoading(true);
    try {
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));
      clearTimeout(timeoutId); // Clear the timeout if operation is successful
      if (verificationId) {
        // Step 2: Sign in with the verification code
        const credential = PhoneAuthProvider.credential(
          verificationId,
          code // You need to get this code from the user input
        );
        // Step 3: Sign in the user with the credential
        const resultSignIn = await signInWithCredential(auth, credential);
        await AsyncStorage.setItem("credentials", JSON.stringify(resultSignIn));
        // console.log(await AsyncStorage.getItem("credentials"));
        // console.log("resultSignIn", resultSignIn);
        await AsyncStorage.setItem("userPhone", data.phone); // Stocker l'identifiant localement
        reset();
      } else {
        console.log("something wrong");
      }
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("User authenticated:", user);
          navigation2.reset({
            index: 0,
            routes: [{ name: "Main", params: { screen: "home" } }],
          });
        } else {
          console.log("User not authenticated");
        }
      });
    } catch (error: any) {
      clearTimeout(timeoutId); // Clear the timeout if operation is successful
      console.error("Erreur lors de la confirmation du code:", error);
      Alert.alert(
        "Erreur",
        `Erreur lors de la confirmation du code: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View className="container">
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={FIREBASE_APP.options}
          />
          <View className="images  p-0 relative w-full -mt-10">
            <Image
              className=" absolute top-0 right-0 max-w-[379] max-h-[379]"
              source={require("../../../assets/images/Ellipse.png")}
              resizeMode="cover"
            />
            <Image
              className=" w-full"
              source={require("../../../assets/images/women_seat.png")}
            />
          </View>
          <View className="container_body gap-5">
            <View className="header justify-center items-center gap-3 px-4">
              <View className="h1_group flex gap-2 items-center">
                <Text className="h1 text-4xl text-primary-600 font-raleway-bold ">
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
                  onPress={() => navigation2.navigate("forgetPassword")}
                />
              </View>
            </View>
            {verificationId && (
              <OtpInput
                numberOfDigits={6}
                focusColor="#FFC400"
                focusStickBlinkingDuration={500}
                onFilled={(text) => setCode(text)}
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
            )}

            <View className="button  px-4">
              <Button
                title={
                  verificationId ? (
                    loading ? (
                      <ActivityIndicator size={"large"} color={"#e29800"} />
                    ) : (
                      "Se connecter"
                    )
                  ) : loading ? (
                    <ActivityIndicator size={"large"} color={"#e29800"} />
                  ) : (
                    "Recevoir le code"
                  )
                }
                theme="primary"
                className=" justify-center items-center"
                styleText="text-white"
                onPress={
                  verificationId
                    ? handleSubmit(confirmCode)
                    : handleSubmit(handleLogin)
                }
              />
              <View className="login flex-row  items-center justify-end ">
                <Text className=" text-gray-500 font-raleway text-sm">
                  Vous n’avez pas encore de compte ?{" "}
                </Text>
                <Button
                  title="S'inscrire"
                  theme="secondary"
                  styleText="text-primary-600 px-0 py-0 text-sm"
                  className={Platform.OS ? "pt-0" : " pt-2 "}
                  isSocialButton={false}
                  onPress={() => navigation2.navigate("S'enregistrer")}
                  disabled={loading}
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
    </KeyboardAvoidingView>
  );
}
