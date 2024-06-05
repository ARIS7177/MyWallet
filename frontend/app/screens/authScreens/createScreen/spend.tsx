import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "../../../../components/Button";
import * as zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "../../../../components/inputComponent";

const spendSchema = zod.object({
  description: zod.string().min(1, "entrer la raison de la depense"),
  montant: zod.coerce.number(),
});
type spendData = zod.infer<typeof spendSchema>;
const Spend = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<spendData>({
    resolver: zodResolver(spendSchema),
  });

  const onSubmit = (data: spendData) => {
    console.log("data", data);
  };
  return (
    <View className="containers w-full  px-4">
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
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Spend;
