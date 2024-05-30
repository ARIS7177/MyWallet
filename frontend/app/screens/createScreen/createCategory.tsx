import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "../../../components/Button";
import * as zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "../../../components/inputComponent";

const categorySchema = zod.object({
  categorie: zod.string().min(1, "entrer une categorie personalisée"),
});
type categoryData = zod.infer<typeof categorySchema>;
const Category = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<categoryData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = (data: categoryData) => {
    console.log("data", data);
  };
  return (
    <View className="containers w-full  px-4">
      <Text className="text-center font-helvitica-bold text-2xl w-full">
        Creer une nouvelle categorie personalisée
      </Text>
      <View className="inputs w-full gap-4">
        <View className="desc gap-3 w-full">
          <Text className=" text-russian-950 text-lg font-raleway-medium">
            Nom de la Categorie
          </Text>
          <Controller
            control={control}
            name="categorie"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputComponent
                type="default"
                placeholder="Entrer une nouvelle categorie"
                onChangeText={onChange}
                isIcon={false}
                className=""
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Category;
