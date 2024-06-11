import { PhoneAuthProvider, auth } from "@/firebaseConfig";
import { useRef, useState } from "react";
import { Alert } from "react-native";

interface optProps {
  phone: string;
  recaptcha: any;
}
export const sendVerificationCode = async ({ phone, recaptcha }: optProps) => {
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  setLoading(true);
  try {
    const phoneProvider = new PhoneAuthProvider(auth);
    const id = await phoneProvider.verifyPhoneNumber(
      `+237${phone}`,
      recaptcha.current!
    );
    setVerificationId(id);
    setCodeSent(true);
    Alert.alert("Succès", "Le code a été envoyé avec succès !");
    setLoading(false);
  } catch (error: any) {
    console.error("Erreur lors de l'envoi du code:", error);
    setError(`Error: ${error.message}`);
    setLoading(false);
    Alert.alert("Erreur", `Erreur lors de l'envoi du code: ${error.message}`);
  }
};
