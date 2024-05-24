import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../components/Button";

export default function App({ navigation }: any) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top }}
      className=" flex-1 items-center gap-20"
    >
      <View className="images  p-0 relative w-full">
        <Image
          className=" absolute top-0 right-0 max-w-[379] max-h-[379]"
          source={require("../../assets/images/Ellipse.png")}
          resizeMode="cover"
        />
        <Image
          className=" w-full"
          source={require("../../assets/images/woment_coin.png")}
        />
      </View>

      <View className="body_texts gap-3 w-full  px-8">
        <Text className=" font-raleway-bold text-3xl font-bold text-center text-russian-950">
          Prenez le controle de vos{" "}
          <Text className=" text-primary-600">finances</Text>, un centime a la
          fois
        </Text>
        <Text className=" font-raleway-medium text-lg text-russian-950">
          Explorez toutes nos fonctionnalites afin de suivre chacune de vos
          depenses et economiser plus d’argent
        </Text>
      </View>

      <View className="buttons flex-row  justify-between gap-5  px-4  w-full">
        <View className="primary flex-1">
          <Button
            className="w-full"
            theme="primary"
            styleText="text-white px-7"
            title="Se connecter"
            onPress={() => navigation.navigate("login")}
          />
        </View>
        <View className="secondary flex-1">
          <Button
            className="w-full"
            theme="default"
            title="S'inscrire"
            styleText="px-7"
            onPress={() => navigation.navigate("S'enregistrer")}
          />
        </View>
      </View>
    </View>
  );
}
