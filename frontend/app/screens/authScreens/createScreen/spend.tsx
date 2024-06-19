import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Button as RNButton,
  TouchableNativeFeedback,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "../../../../components/Button";
import * as zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "../../../../components/inputComponent";
import { FIREBASE_BD, auth } from "@/firebaseConfig";
import DropDownPicker from "react-native-dropdown-picker";
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
  newCategorie: zod
    .string()
    .min(1, "creer une nouvelle categorie une catégorie"),
});
type spendData = zod.infer<typeof spendSchema>;

const Spend = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = auth.currentUser;
  const [categories, setCategories] = useState([
    { label: "Catégorie 1", value: "cat1" },
    { label: "Catégorie 2", value: "cat2" },
  ]); // Initial categories
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newCategorie, setNewCategorie] = useState("");

  const {
    setValue,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<spendData>({
    resolver: zodResolver(spendSchema),
  });

  const addNewCategory = async () => {
    if (newCategorie) {
      const newCategory = {
        label: newCategorie,
        value: newCategorie.toLowerCase().replace(/\s+/g, ""),
      };
      setCategories([...categories, newCategory]);
      setNewCategorie("");
      setOpenModal(false);

      // Save new category to Firestore
      if (user) {
        try {
          await setDoc(
            doc(
              FIREBASE_BD,
              `users/${user.uid}/categories/${newCategory.value}`
            ),
            {
              name: newCategorie,
              createdAt: serverTimestamp(),
            }
          );
        } catch (error: any) {
          console.error("Error adding category: ", error);
          Alert.alert("Erreur", `une erreur est survenue: ${error.message}`);
        }
      } else {
        console.log("dont connect !!");
      }
    }
  };

  const createSpend = async (data: spendData) => {
    console.log("data", data);

    if (user) {
      try {
        setIsLoading(true);
        const docRef = await addDoc(collection(FIREBASE_BD, `expenses`), {
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          montant: data.montant,
          description: data.description,
          categorie: data.categorie,
          timestamp: new Date(),
        });
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

  return (
    <View className="containers w-full  px-4 gap-5 flex-1 ">
      <Text className="text-center font-helvitica-bold text-2xl w-full">
        Creer une nouvelle depense
      </Text>
      <View className="inputs w-full gap-4">
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
        <View className="desc gap-3 w-full">
          <Text className=" text-russian-950 text-lg font-raleway-medium">
            Catégorie
          </Text>
          <Controller
            control={control}
            name="categorie"
            render={({ field: { onChange, value } }) => (
              <>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={categories}
                  setOpen={setOpen}
                  setValue={onChange}
                  setItems={setCategories}
                  placeholder="Sélectionner une catégorie"
                  style={{ zIndex: 1000 }}
                />
                <TouchableOpacity
                  onPress={() => setOpenModal(true)}
                  style={{ marginTop: 10 }}
                >
                  <Text style={{ color: "blue", textAlign: "center" }}>
                    Créer une nouvelle catégorie
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />
          {errors.categorie && (
            <Text style={{ color: "red" }}>{errors.categorie.message}</Text>
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
          theme="primary"
          styleText="text-white"
          onPress={handleSubmit(createSpend)}
          className="mt-14"
        />
      </View>
      <Modal visible={openModal} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <TextInput
                  placeholder="Nouvelle catégorie"
                  value={newCategorie}
                  onChangeText={setNewCategorie}
                  style={styles.input}
                />
                <View className="buttons flex-row gap-10">
                  <Button
                    title="Annuler"
                    theme="danger"
                    onPress={() => setOpenModal(false)}
                    styleText="text-lg px-4"
                    className=" w-36"
                  />
                  <Button
                    title="Ajouter"
                    theme="success"
                    onPress={addNewCategory}
                    styleText="text-lg px-4"
                    className="w-36"
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    width: "80%",
    paddingVertical: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: "80%",
  },
});

export default Spend;
