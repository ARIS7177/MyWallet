import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "../../../components/Button";
import * as zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "../../../components/inputComponent";

const budgetSchema = zod.object({
  pourcentage: zod
    .string()
    .min(1, "entrer le pourcentage dont vous ne voudriez pas depasser")
    .max(100, "Le nombre doit être inférieur ou égal à 100"),
  montant: zod.coerce.number(),
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

  const onSubmit = (data: budgetData) => {
    console.log("data", data);
  };
  return (
    <View className="containers w-full px-4 gap-10  flex-1">
      <View className="inputs w-full gap-10">
        <View className="percent_group gap-4">
          <Text className="text-center font-helvitica-bold text-2xl w-full">
            Creer un nouveau budget sous forme de pourcentage
          </Text>
          <View className="desc gap-2 w-full">
            <Text className=" text-russian-950 text-lg font-raleway-medium">
              Pourcentage
            </Text>
            <Controller
              control={control}
              name="pourcentage"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputComponent
                  type="default"
                  placeholder="Entrer un pourcentage"
                  onChangeText={onChange}
                  isIcon={true}
                  iconType="FontAwesome"
                  personalIcon="percent"
                  className="flex-row items-center  gap-10"
                  iconStyle="w-8 h-12 text-center pt-3 "
                  textStyle="w-5/6"
                />
              )}
            />
          </View>
        </View>
        <View className="container_delimiter flex-row items-center justify-center gap-3">
          <View className="first_delemiter flex- border-b border-b-gray-300  w-48"></View>
          <Text className="text-gray-400 text-xl">Ou</Text>
          <View className="second_delimiter flex- border-b border-b-gray-300  w-48"></View>
        </View>
        <View className="amount_group gap-4 ">
          <Text className="text-center font-helvitica-bold text-2xl w-full">
            Inscrire un montant precis
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
                />
              )}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Budget;
