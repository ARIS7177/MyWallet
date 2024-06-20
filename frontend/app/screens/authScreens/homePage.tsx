import React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootTabParamList } from "@/app/navigations/Tabnavigator";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomHeader from "@/components/customHeader";

type homePageProp = RouteProp<RootTabParamList, "home">;
export default function HomePage() {
  const route = useRoute<homePageProp>();
  // const { phone } = route.params;
  const datas = [
    {
      id: "1",
      categorie: "Alimentation",
      description:
        "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      montant: "10000 Fcfa",
      date: "10 Mai 2024",
    },
    {
      id: "2",
      categorie: "Alimentation",
      description: "lorem ipsum lorem ipsum",
      montant: "10000 Fcfa",
      date: "10 Mai 2024",
    },
    {
      id: "3",
      categorie: "Alimentation",
      description: "lorem ipsum lorem ipsum",
      montant: "10000 Fcfa",
      date: "10 Mai 2024",
    },
    {
      id: "4",
      categorie: "Alimentation",
      description: "lorem ipsum lorem ipsum",
      montant: "10000 Fcfa",
      date: "10 Mai 2024",
    },
    {
      id: "5",
      categorie: "Alimentation",
      description: "lorem ipsum lorem ipsum",
      montant: "10000 Fcfa",
      date: "10 Mai 2024",
    },
  ];
  const datasEconomy = [
    {
      id: "1",
      mois: "Janvier",
      montant: "10000 Fcfa",
      economy_percent: "20%",
    },
    {
      id: "2",
      mois: "Janvier",
      montant: "10000 Fcfa",
      economy_percent: "20%",
    },
    {
      id: "3",
      mois: "Janvier",
      montant: "10000 Fcfa",
      economy_percent: "20%",
    },
    {
      id: "4",
      mois: "Janvier",
      montant: "10000 Fcfa",
      economy_percent: "20%",
    },
    {
      id: "5",
      mois: "Janvier",
      montant: "10000 Fcfa",
      economy_percent: "20%",
    },
  ];
  const datasObjectif = [
    {
      id: "1",
      mois: "Fevrier",
      objectif: "lorem ipsum lorem ipsum ipsum lorem",
    },
    {
      id: "2",
      mois: "Fevrier",
      objectif: "lorem ipsum lorem ipsum ipsum lorem",
    },
    {
      id: "3",
      mois: "Fevrier",
      objectif: "lorem ipsum lorem ipsum ipsum lorem",
    },
    {
      id: "4",
      mois: "Fevrier",
      objectif: "lorem ipsum lorem ipsum ipsum lorem",
    },
    {
      id: "5",
      mois: "Fevrier",
      objectif: "lorem ipsum lorem ipsum ipsum lorem",
    },
  ];
  const { width: screenWidth } = Dimensions.get("window");
  const renderItem = ({ item }) => (
    <View className=" bg-[#FFFFEA] py-3 px-1 w-60  rounded-xl items-center border-[0.3px] border-wild_sald-500">
      <View className="gap-3">
        <Text className=" font-helvitica text-lg">{item.categorie}</Text>
        <Text className=" font-raleway-bold text-2xl" numberOfLines={2}>
          {item.description}
        </Text>
        <Text className=" font-raleway-bold text-primary-600 text-2xl">
          {item.montant}
        </Text>
        <View className="date flex-row gap-3 items-center">
          <View className="circle bg-green-700 w-4 h-4 rounded-full items-center"></View>
          <Text className=" font-raleway-bold text-wild_sald-500 text-xl">
            {item.date}
          </Text>
        </View>
      </View>
    </View>
  );
  const ItemSeparator = () => <View className="w-1" />;

  //economy
  const renderItemEconomy = ({ item }) => (
    <View
      className="w-full rounded-2xl p-4"
      style={[styles.shadow, { width: screenWidth - 25 }]}
    >
      <View className="left  gap-3 " style={{ width: screenWidth - 150 }}>
        <Text className=" text-wild_sald-500 text-2xl font-raleway-bold ">
          {item.mois}
        </Text>
        <Text className=" font-raleway-medium text-wild_sald-950 text-2xl font-semibold">
          Bravo vous avez fais des economies de{" "}
        </Text>
        <Text className=" text-wild_sald-500 text-xl font-raleway-bold">
          Total :{" "}
          <Text className="text-primary-600 text-3xl font-raleway-bold">
            {item.montant}
          </Text>{" "}
        </Text>
      </View>
      <View className="right "></View>
    </View>
  );

  //economy
  const renderItemObjectif = ({ item }) => (
    <View
      className="w-full rounded-2xl p-4"
      style={[styles.shadow, { width: screenWidth - 25 }]}
    >
      <View className=" gap-3 " style={{ width: screenWidth }}>
        <Text className=" text-wild_sald-500 text-2xl font-raleway-bold ">
          {item.mois}
        </Text>
        <Text className=" font-raleway-medium text-wild_sald-950 text-2xl font-semibold">
          Economiser 20% de mon revenue
        </Text>
      </View>
    </View>
  );
  return (
    <View className="container flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* <CustomHeader /> */}
        <View className="subContainer gap-5 px-3">
          <View className="salutations mt-5 ">
            <Text className=" font-helvitica-bold text-2xl">
              Hello, Mr Aristide
            </Text>
            <Text className=" font-raleway-medium text-xl">Bon retour !!!</Text>
          </View>
          <View className="budget justify-center border-[0.5px] border-gray-400 items-center rounded-3xl mx-5 bg-purple-100">
            <View className=" py-10">
              <Text className=" font-raleway-bold text-2xl text-center">
                Votre solde actuel :{" "}
              </Text>
              <Text className=" font-raleway-bold text-[45px] text-primary-600">
                50000 Fcfa{" "}
              </Text>
            </View>
          </View>
          <View className="spends gap-5">
            <View className="header flex-row gap-5 items-center  ">
              <Text className=" font-helvitica font-bold text-2xl text-center ">
                Mes depenses
              </Text>
              <View className="circle rounded-full w-8 h-8 border border-gray-400 justify-end items-center bg-gray-300">
                <Text className=" text-pink-600  text-lg text-center font-bold">
                  3
                </Text>
              </View>
            </View>
            <FlatList
              data={datas}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false} // Pour cacher l'indicateur de défilement horizontal
              contentContainerStyle={{ paddingHorizontal: 10 }} // Pour ajouter des styles au conteneur de la FlatList
              ItemSeparatorComponent={ItemSeparator}
            />
          </View>

          <View className="economy gap-4">
            <View className="header flex-row gap-5 items-center  ">
              <Text className=" font-helvitica font-bold text-2xl text-center ">
                Mes Economies
              </Text>
            </View>
            <FlatList
              data={datasEconomy}
              renderItem={renderItemEconomy}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false} //
              ItemSeparatorComponent={ItemSeparator}
            />
          </View>
          <View className="economy gap-4">
            <View className="header flex-row gap-5 items-center  ">
              <Text className=" font-helvitica font-bold text-2xl text-center ">
                Mes objectifs
              </Text>
            </View>
            <FlatList
              data={datasObjectif}
              renderItem={renderItemObjectif}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false} //
              ItemSeparatorComponent={ItemSeparator}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "#fff",
    // Pour iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Pour Android
    elevation: 5,
  },
});
