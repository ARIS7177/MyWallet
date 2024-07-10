import Button from "@/components/Button";
import InputComponent from "@/components/inputComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AuthNavigator";
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as zod from "zod";
import { doc, getDoc } from "firebase/firestore";
import {
  FIREBASE_BD,
  FirebaseRecaptchaVerifierModal,
  PhoneAuthProvider,
  auth,
  signInWithPhoneNumber,
} from "@/firebaseConfig";

const PhoneSchema = zod.object({
  phone: zod.string().min(9, "Numéro de téléphone invalide").max(9),
});

type FormData = zod.infer<typeof PhoneSchema>;

export default function ForgetPassword() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(PhoneSchema) });
  const recaptchaVerifier = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      setLoading(true);
      const userDoc = await getDoc(
        doc(FIREBASE_BD, "users", `+237${data.phone}`)
      );
      if (userDoc.exists()) {
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
          `+237${data.phone}`,
          recaptchaVerifier.current!
        );
        navigation.navigate("EntryResetCode", {
          phone: data.phone,
          verificationId: verificationId,
        });
        setLoading(false);
      } else {
        Alert.alert("Erreur", "L'utilisateur est introuvable");
        setLoading(false);
      }
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="container">
            <FirebaseRecaptchaVerifierModal
              ref={recaptchaVerifier}
              firebaseConfig={auth.app.options}
            />
            <View className="images  p-0 relative w-full ">
              <Image
                className=" absolute top-0 right-0 max-w-[379] max-h-[379]"
                source={require("../../../assets/images/Ellipse.png")}
                resizeMode="cover"
              />
              <Image
                className=" w-full"
                source={require("../../../assets/images/Forgot password-bro.png")}
              />
            </View>
            <View className="body gap-10 p-4 ">
              <View className="text gap-10">
                <Text className="text-center px-10 font-raleway-medium">
                  Merci d'entrez votre numero d’inscription ci-dessous pour
                  recevoir un code de verification afin de renitialiser votre
                  mot de passe
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
              <View className="button pt-10 w-full">
                <Button
                  title={
                    isLoading ? (
                      <ActivityIndicator
                        size={"large"}
                        color={"#bb6c02"}
                        className="text-center"
                      />
                    ) : (
                      "Envoyer"
                    )
                  }
                  theme="primary"
                  isSocialButton={false}
                  onPress={handleSubmit(onSubmit)}
                  styleText="text-white"
                  className="w-full "
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
