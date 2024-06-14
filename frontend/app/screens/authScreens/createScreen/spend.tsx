import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ActivityIndicator,
  Modal,
  Button as RNButton,
} from "react-native";
import Button from "../../../../components/Button";
import * as zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "../../../../components/inputComponent";
import { FIREBASE_BD, auth } from "@/firebaseConfig";
import { Picker } from "@react-native-picker/picker";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const spendSchema = zod.object({
  description: zod.string().min(3, "entrer la raison de la depense"),
  montant: zod.coerce.number(),
  categorie: zod.string().min(1, "choisissez une catégorie"),
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

  const [categories, setCategories] = useState([
    "Alimentation",
    "Transport",
    "Logement",
    "Loisirs",
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const createSpend = async (data: spendData) => {
    console.log("data", data);

    if (user) {
      try {
        setIsLoading(true);
        const docRef = await addDoc(
          collection(FIREBASE_BD, `expenses${user.phoneNumber}`),
          {
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            montant: data.montant,
            description: data.description,
            categorie: data.categorie,
            timestamp: new Date(),
          }
        );
        console.log("Document written with ID: ", docRef.id);
        Alert.alert("succes", "creation de la depense valide");
        reset();
        setIsLoading(false);
        reset();
      } catch (error: any) {
        console.error("Error adding document: ", error);
        Alert.alert("Erreur", `une erreur est survenue: ${error.message}`);
        setIsLoading(false);
      }
    } else {
      console.log("User is not signed in.");
    }
  };

  const handleNewCategory = async () => {
    setCategories([...categories, newCategory]);
    await addDoc(collection(FIREBASE_BD, `categories${user?.phoneNumber}`), {
      newCategory,
    });
    setNewCategory("");
    setModalVisible(false);
  };
  return (
    <View className="containers w-full  px-4 gap-5 flex-1 ">
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
        <View className="desc gap-3 w-full">
          <Text className=" text-russian-950 text-lg font-raleway-medium">
            Catégorie
          </Text>
          <View className="border rounded-xl bg-white">
            <Controller
              control={control}
              name="categorie"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => {
                    if (itemValue === "add_new") {
                      setModalVisible(true);
                    } else {
                      onChange(itemValue);
                    }
                  }}
                >
                  <Picker.Item label="Choisissez une catégorie" value="" />
                  {categories.map((category, index) => (
                    <Picker.Item
                      label={category}
                      value={category}
                      key={index}
                    />
                  ))}
                  <Picker.Item
                    label="Ajouter une nouvelle catégorie"
                    value="add_new"
                  />
                </Picker>
              )}
            />
          </View>
          {errors.categorie && (
            <Text className="text-red-500">{errors.categorie.message}</Text>
          )}
        </View>
      </View>
      <View className="buttons">
        <Button
          title={
            isLoading ? (
              <ActivityIndicator size={"large"} color={"#fff"} />
            ) : (
              "Creer nouvelle depense"
            )
          }
          theme="success"
          styleText="text-white"
          onPress={handleSubmit(createSpend)}
          className="mt-14"
        />
      </View>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View className=" flex-1 justify-center items-center bg-black opacity-80">
          <View className=" p-5 rounded-md w-4/5 align-middle bg-white gap-2 ">
            <Text>Nouvelle catégorie:</Text>
            <InputComponent
              className=" border-b border-gray-800 w-full mb-3 p-1"
              type="default"
              placeholder="Entrer une nouvelle catégorie"
              onChangeText={setNewCategory}
              value={newCategory}
            />
            <View className="flex-row gap-2 justify-between ">
              <RNButton title="Ajouter" onPress={handleNewCategory} />
              <RNButton
                title="Annuler"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Spend;
