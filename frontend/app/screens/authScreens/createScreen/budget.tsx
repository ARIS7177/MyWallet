import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import Button from "../../../../components/Button";
import * as zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "../../../../components/inputComponent";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const budgetSchema = zod
  .object({
    montant: zod.coerce.number(),
    startDate: zod.date().refine((date) => date >= new Date(), {
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

  const onSubmit = (data: budgetData) => {
    console.log("data", data);
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
          title="Soumettre"
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
