import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, ActivityIndicator } from "react-native";
import Button from "../../../../components/Button";
import * as zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "../../../../components/inputComponent";
import { FIREBASE_BD, auth } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { usePhoneContext } from "@/lib/PhoneContext";
import { User } from "@firebase/auth";

const spendSchema = zod.object({
  description: zod.string().min(3, "entrer la raison de la depense"),
  montant: zod.coerce.number(),
});
type spendData = zod.infer<typeof spendSchema>;

const Spend = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = auth.currentUser;

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<spendData>({
    resolver: zodResolver(spendSchema),
  });

  const createSpend = async (data: spendData) => {
    console.log("data", data);
    if (user) {
      try {
        setIsLoading(true);
        const docRef = await addDoc(collection(FIREBASE_BD, "expenses"), {
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          activityData: data,
          timestamp: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);
        Alert.alert("succes", "creation de la depense valide");
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error adding document: ", error);
        Alert.alert("Erreur", `une erreur est survenue: ${error.message}`);
        setIsLoading(false);
      }
    } else {
      console.log("User is not signed in.");
    }
  };
  return (
    <View className="containers w-full  px-4 gap-5">
      <Text className="text-center font-helvitica-bold text-2xl w-full">
        Creer une nouvelle depense
      </Text>
      <View className="inputs w-full gap-4">
        <View className="desc gap-3 w-full">
          <Text className=" text-russian-950 text-lg font-raleway-medium">
            Description
          </Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputComponent
                type="default"
                placeholder="Entrer un description"
                onChangeText={onChange}
                isIcon={false}
                className=""
                errorMessage={errors.description?.message}
              />
            )}
          />
        </View>
        <View className="desc gap-3  w-full">
          <Text className=" text-russian-950 text-lg font-raleway-medium">
            Montant
          </Text>
          <Controller
            control={control}
            name="montant" // Assurez-vous d'avoir le bon nom pour ce champ
            render={({ field: { onChange, onBlur, value } }) => (
              <InputComponent
                type="default"
                placeholder="Entrer un montant"
                onChangeText={onChange}
                isIcon={false}
                errorMessage={errors.montant?.message}
              />
            )}
          />
        </View>
      </View>
      <View className="buttons">
        <Button
          title={
            isLoading ? (
              <ActivityIndicator size={"large"} color={"#bb6c02"} />
            ) : (
              "Creer nouvelle depense"
            )
          }
          theme="success"
          styleText="text-white"
          onPress={handleSubmit(createSpend)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Spend;
