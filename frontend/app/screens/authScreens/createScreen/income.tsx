import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Button from "../../../../components/Button";
import * as zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "../../../../components/inputComponent";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_BD, auth } from "@/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const incomeSchema = zod.object({
  source: zod.string().min(1, "entrer la source de vos revenues svp"),
  montant: zod.coerce.number().min(1000, "minimum 1000f"),
});

type incomeData = zod.infer<typeof incomeSchema>;

const Income = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<incomeData>({
    resolver: zodResolver(incomeSchema),
  });
  const [user, setUSer] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUSer(currentUser);
    });
    unsubscribe;
  }, []);
  const onSubmit = async (data: incomeData) => {
    console.log("data", data);
    if (user) {
      setIsLoading(true);
      try {
        const docRef = await addDoc(collection(FIREBASE_BD, "incomes"), {
          montant: data.montant,
          source: data.source,
          uid: user.uid,
        });
        reset();
        console.log("Document written with id: ", docRef);
        Alert.alert("succes", "creation de la depense valide");
      } catch (error: any) {
        console.error("Error adding document: ", error);
        Alert.alert("Erreur", `une erreur est survenue: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("User is not signed in.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer une nouvelle source de revenu</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Montant</Text>
        <Controller
          control={control}
          name="montant"
          render={({ field: { onChange, value } }) => (
            <InputComponent
              type="default"
              placeholder="Entrer un montant"
              value={value}
              onChangeText={onChange}
              isIcon={false}
              keyboard={"phone-pad"}
            />
          )}
        />
        {errors.montant && (
          <Text style={styles.errorText}>{errors.montant.message}</Text>
        )}
      </View>
      <View className="gap-5">
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Source</Text>
          <Controller
            control={control}
            name="source"
            render={({ field: { onChange, value } }) => (
              <InputComponent
                type="default"
                placeholder="Entrer une source"
                value={value}
                onChangeText={onChange}
                isIcon={false}
              />
            )}
          />
          {errors.source && (
            <Text style={styles.errorText}>{errors.source.message}</Text>
          )}
        </View>

        <Button
          title={
            isLoading ? (
              <ActivityIndicator size={"large"} color={"#fff"} />
            ) : (
              "Valider"
            )
          }
          onPress={handleSubmit(onSubmit)}
          theme={"primary"}
          className="mt-8"
          styleText=" text-white"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputs: {
    gap: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  datePickerContainer: {
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default Income;
