import { Text, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "./Button";

export default function App() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top }}
      className=" flex-1 items-center gap-20"
    >
      <View className="images  p-0 relative w-full">
      <Image
        className=" absolute top-0 right-0 max-w-[379] max-h-[379]"
        source={require("../assets/images/Ellipse.png")}
        resizeMode="cover"
      />
      <Image
        className=" w-full"
        source={require("../assets/images/woment_coin.png")}
      />
      </View>

      <View className="body_texts gap-3 w-full  px-4">
        <Text className=" font-raleway text-3xl font-bold text-center text-russian-950">
          Prenez le controle de vos{" "}
          <Text className=" text-primary-600">finances</Text>, un centime a la
          fois
        </Text>
        <Text className=" font-raleway font-medium text-lg text-russian-950">
          Explorez toutes nos fonctionnalites afin de suivre chacune de vos
          depenses et economiser plus d’argent
        </Text>
      </View>

      <View className="buttons flex-1 m-auto flex-row  justify-center gap-10 px-4  w-full">
        <Button theme="primary" styleText="text-white" title="Se connecter" />
        <Button theme="default" title="S'inscrire" />
      </View>
    </View>
  );
}
