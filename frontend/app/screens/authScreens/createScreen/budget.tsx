import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
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
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_BD, auth } from "@/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
const budgetSchema = zod
  .object({
    montant: zod.coerce.number().min(100, "montant minimum 100f"),
    objectif: zod.string().optional(),
    startDate: zod
      .date()
      .refine((date) => date === new Date() || date >= new Date(), {
        message: "La date doit être supérieure ou égale à aujourd'hui",
      }),
    endDate: zod.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "La date de fin doit être supérieure à celle de début",
    path: ["endDate"],
  });
type budgetData = zod.infer<typeof budgetSchema>;
const Budget = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<budgetData>({
    resolver: zodResolver(budgetSchema),
  });
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);

  const showStartDatePicker = () => setIsStartDatePickerVisible(true);
  const hideStartDatePicker = () => setIsStartDatePickerVisible(false);

  const showEndDatePicker = () => setIsEndDatePickerVisible(true);
  const hideEndDatePicker = () => setIsEndDatePickerVisible(false);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long", // 'short' pour abrégé, 'narrow' pour très court
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("fr-FR", options);
  };

  const handleDateChange =
    (onChange) => (event: DateTimePickerEvent, date?: Date) => {
      if (date) {
        onChange(date);
      }
      if (Platform.OS === "android") {
        hideStartDatePicker();
        hideEndDatePicker();
      }
    };

  const onSubmit = async (data: budgetData) => {
    console.log("data", data);
    setIsLoading(true);
    if (user) {
      try {
        const docRef = await addDoc(collection(FIREBASE_BD, "budgets"), {
          montant: data.montant,
          startDate: data.startDate,
          endDate: data.endDate,
          objectif: data.objectif,
          uid: user.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        Alert.alert("succes", "creation de la depense valide");
      } catch (error: any) {
        console.error("Error adding document: ", error);
        Alert.alert("Erreur", `une erreur est survenue: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("User not authenticated");
    }
  };
  return (
    <View className="containers w-full px-4 gap-10  flex-1">
      <View className="inputs w-full gap-10">
        <View className="amount_group gap-4 ">
          <Text className="text-center font-helvitica-bold text-2xl w-full">
            Inscrire un budget
          </Text>
          <View className="desc gap-2  w-full">
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
                  keyboard={"phone-pad"}
                />
              )}
            />
            {errors.montant && (
              <Text className=" text-rose-600 mt-1">
                {errors.montant.message}
              </Text>
            )}
          </View>
          <View className="desc gap-2  w-full">
            <Text className=" text-russian-950 text-lg font-raleway-medium">
              Objectif{" "}
              <Text className="text-sm text-wild_sald-500">(Optionel)</Text>
            </Text>
            <Controller
              control={control}
              name="objectif" // Assurez-vous d'avoir le bon nom pour ce champ
              render={({ field: { onChange, onBlur, value } }) => (
                <InputComponent
                  type="default"
                  placeholder="Entrer votre objectif"
                  onChangeText={onChange}
                  isIcon={false}
                />
              )}
            />
            {errors.objectif && (
              <Text className=" text-rose-600 mt-1">
                {errors.objectif.message}
              </Text>
            )}
          </View>
        </View>
        <View className="container date flex-row gap-5">
          <View className=" w-[48%]">
            <Text className=" text-xl font-raleway">Date de début</Text>
            <Controller
              control={control}
              name="startDate"
              render={({ field: { onChange, value } }) => (
                <View className="border-[0.5px] border-[#292929] w-full rounded-xl bg-purple-50 relative p-5">
                  <TouchableOpacity onPress={showStartDatePicker}>
                    <Text className=" flex-nowrap">
                      {value ? formatDate(value) : "Entrer une date de début"}
                    </Text>
                  </TouchableOpacity>
                  {isStartDatePickerVisible && (
                    <DateTimePicker
                      value={value || new Date()}
                      mode="date"
                      display="default"
                      minimumDate={new Date()}
                      onChange={handleDateChange(onChange)}
                    />
                  )}
                </View>
              )}
            />
            {errors.startDate && (
              <Text className=" text-rose-600 mt-1">
                {errors.startDate.message}
              </Text>
            )}
          </View>

          <View className="w-[48%]">
            <Text className=" text-xl font-raleway">Date de fin</Text>
            <Controller
              control={control}
              name="endDate"
              render={({ field: { onChange, value } }) => (
                <View className="border-[0.5px] border-[#292929] w-full rounded-xl bg-purple-50 relative p-5">
                  <TouchableOpacity onPress={showEndDatePicker}>
                    <Text>
                      {value ? formatDate(value) : "Entrer une date de fin"}
                    </Text>
                  </TouchableOpacity>
                  {isEndDatePickerVisible && (
                    <DateTimePicker
                      value={value || new Date()}
                      mode="date"
                      display="default"
                      minimumDate={new Date()}
                      onChange={handleDateChange(onChange)}
                    />
                  )}
                </View>
              )}
            />
            {errors.endDate && (
              <Text className=" text-rose-600">{errors.endDate.message}</Text>
            )}
          </View>
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

const styles = StyleSheet.create({});

export default Budget;
