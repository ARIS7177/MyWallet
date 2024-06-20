import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "../../../components/Button";
import * as zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "../../../components/inputComponent";
import { FIREBASE_BD, auth } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const spendSchema = zod.object({
  description: zod.string().min(3, "Entrer la raison de la dépense"),
  montant: zod.coerce.number(),
  categorie: zod.string().min(1, "Choisissez une catégorie"),
  newCategorie: zod
    .string()
    .min(1, "Créer une nouvelle catégorie une catégorie"),
});
type spendData = zod.infer<typeof spendSchema>;

const Spend = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = auth.currentUser;
  const [categories, setCategories] = useState([
    { label: "Alimentation", value: "cat1" },
    { label: "Transport", value: "cat2" },
    { label: "Connexion", value: "cat3" },
    { label: "Bien-être", value: "cat4" },
    { label: "Créer une nouvelle catégorie", value: "create_new_category" },
  ]); // Initial categories
  const [openModal, setOpenModal] = useState(false);
  const [newCategorie, setNewCategorie] = useState("");
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

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
          Alert.alert("Erreur", `Une erreur est survenue: ${error.message}`);
        }
      } else {
        console.log("User not connected!!");
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
        Alert.alert("Succès", "Création de la dépense valide");
        reset();
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error adding document: ", error);
        Alert.alert("Erreur", `Une erreur est survenue: ${error.message}`);
        setIsLoading(false);
      }
    } else {
      console.log("User is not signed in.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer une nouvelle dépense</Text>
      <View style={styles.inputs}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Montant</Text>
          <Controller
            control={control}
            name="montant" // Assurez-vous d'avoir le bon nom pour ce champ
            render={({ field: { onChange, value } }) => (
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <InputComponent
                type="default"
                placeholder="Entrer une description"
                onChangeText={onChange}
                isIcon={false}
                errorMessage={errors.description?.message}
              />
            )}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Catégorie</Text>
          <Controller
            control={control}
            name="categorie"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setCategoryModalVisible(true)}
                >
                  <Text>
                    {selectedCategory || "Sélectionner une catégorie"}
                  </Text>
                </TouchableOpacity>
                {errors.categorie && (
                  <Text style={{ color: "red" }}>
                    {errors.categorie.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          title={
            isLoading ? (
              <ActivityIndicator size={"large"} color={"#fff"} />
            ) : (
              "Créer nouvelle dépense"
            )
          }
          theme="primary"
          styleText="text-white"
          onPress={handleSubmit(createSpend)}
          // style={styles.button}
        />
      </View>
      <Modal visible={openModal} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Nouvelle catégorie</Text>
                <TextInput
                  placeholder="Nouvelle catégorie"
                  value={newCategorie}
                  onChangeText={setNewCategorie}
                  style={styles.input}
                />
                <View style={styles.modalButtons}>
                  <Button
                    title="Annuler"
                    theme="danger"
                    onPress={() => setOpenModal(false)}
                    styleText="text-lg px-4"
                    // style={styles.modalButton}
                  />
                  <Button
                    title="Ajouter"
                    theme="success"
                    onPress={addNewCategory}
                    styleText="text-lg px-4"
                    // style={styles.modalButton}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={categoryModalVisible}
        transparent={true}
        animationType="slide"
      >
        <TouchableWithoutFeedback
          onPress={() => setCategoryModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <FlatList
                  data={categories}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.categoryItem}
                      onPress={() => {
                        setSelectedCategory(item.label);
                        setCategoryModalVisible(false);
                        setValue("categorie", item.value);
                      }}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  inputs: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 4,
  },
  buttons: {
    marginTop: 16,
  },
  button: {
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: "100%",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 16,
  },
  modalButton: {
    width: 120,
  },
  categoryItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default Spend;
