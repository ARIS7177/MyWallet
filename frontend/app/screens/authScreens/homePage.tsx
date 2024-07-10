import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootTabParamList } from "@/app/navigations/Tabnavigator";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomHeader from "@/components/customHeader";
import { User } from "firebase/auth";
import {
  fetchUserBudgets,
  fetchUserDatas,
  fetchUserExpenses,
  fetchUserIncomes,
} from "@/components/getItems";
import { useUser } from "@/stores/user";
import { auth } from "@/firebaseConfig";
import CircularProgressBar from "@/components/circularProgressBar";
import Button from "@/components/Button";

type homePageProp = RouteProp<RootTabParamList, "home">;
export default function HomePage() {
  const { user, setUser } = useUser();
  const route = useRoute<homePageProp>();
  // const { phone } = route.params;
  const [userDatas, setUserDatas] = useState<any[]>([]);
  const [userExpenses, setUserExpenses] = useState<any[]>([]);
  const [userBudgets, setUserBudgets] = useState<any[]>([]);
  const [userRevenues, setUserRevenues] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);

  //fonction pour suivre la progression :
  const increaseProgress = () => {
    setProgress((prev) => (prev + 10 > 100 ? 100 : prev + 10));
  };
  // Fonction pour convertir l'horodatage en une date lisible
  const convertTimestampToDate = (timestamp) => {
    const milliseconds =
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    const date = new Date(milliseconds);
    const jour = date.getDate();
    const mois = date.getMonth() + 1; // Les mois sont de 0 à 11
    const annee = date.getFullYear();
    // const options: Intl.DateTimeFormatOptions = {
    //   weekday: "long", // 'short' pour abrégé, 'narrow' pour très court
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    // };

    const formatedDate = date.toLocaleDateString("fr-FR");
    return formatedDate;
  };

  //extraire le mois sous la forme chaine de caractere
  const getMonthName = (timestamp) => {
    const milliseconds =
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    const date = new Date(milliseconds);
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    const monthName = date.toLocaleDateString("fr-FR", options);
    return monthName;
  };

  //somme des revenues
  const sumIncomes = userRevenues.reduce((acc, obj) => {
    return acc + obj.montant;
  }, 0);

  const sumBudgets = userBudgets.reduce((acc, obj) => {
    return acc + obj.montant;
  }, 0);

  // console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        // console.log("here");
        try {
          const userDatas = await fetchUserDatas(user);
          const userExpenses = await fetchUserExpenses(user);
          const userBudgets = await fetchUserBudgets(user);
          const userIncomes = await fetchUserIncomes(user);
          // Convertir les horodatages
          const formattedExpenses = userExpenses.map((expense) => ({
            ...expense,
            formattedDate: convertTimestampToDate(expense.timestamp),
          }));
          setUserDatas(userDatas);
          setUserExpenses(formattedExpenses);
          setUserBudgets(userBudgets);
          setUserRevenues(userIncomes);
          console.log("Données de l'utilisateur :", userDatas); // Afficher les données récupérées
          console.log("userDatas[0]", userDatas[0].name);
          console.log("userExpenses", formattedExpenses);
          console.log(formattedExpenses[0].formattedDate);
          console.log("userBudget", userBudgets);
          console.log(
            "userBudgets",
            convertTimestampToDate(userBudgets[0].startDate)
          );
        } catch (error) {
          console.error("Erreur lors de la récupération des userData :", error);
        }
      } else {
        console.log("don't have user");
      }
    };
    fetchData();
  }, [user]);

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

  //expenses
  const renderItem = ({ item }) => (
    <View className=" bg-[#FFFFEA] py-3 px-1 w-60  rounded-xl items-center border-[0.3px] border-wild_sald-500">
      <View className="gap-3  justify-between ">
        <Text className=" font-helvitica text-sm">{item.categorie}</Text>
        <Text className=" font-raleway-bold text-xl" numberOfLines={2}>
          {item.description}
        </Text>
        <Text className=" font-raleway-bold text-primary-600 text-xl">
          {item.montant} Fcfa
        </Text>
        <View className="date flex-row gap-3 items-center">
          <View className="circle bg-green-700 w-4 h-4 rounded-full items-center"></View>
          <Text className=" font-raleway-bold text-wild_sald-500 text-sm">
            {item.formattedDate}
          </Text>
        </View>
      </View>
    </View>
  );
  const ItemSeparator = () => <View className="w-3" />;

  //economy
  const renderItemEconomy = ({ item }) => (
    <View
      className="w-full rounded-2xl p-4 flex-row gap-5"
      style={[styles.shadow, { width: screenWidth - 25 }]}
    >
      <View className="left  gap-2" style={{ width: screenWidth - 200 }}>
        <Text className=" text-wild_sald-500 text-2xl font-raleway-bold capitalize ">
          {getMonthName(item.startDate)}
        </Text>
        <Text className=" font-raleway-medium text-wild_sald-950 text-xl font-semibold">
          Bravo vous avez fais des economies de{" "}
        </Text>
        <Text className=" text-wild_sald-500 text-xl font-raleway-bold">
          Total :{" "}
          <Text className="text-primary-600 text-xl font-raleway-bold">
            {item.montant} Fcfa
          </Text>{" "}
        </Text>
      </View>
      <View className="right ">
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgressBar
            size={120}
            strokeWidth={10}
            progress={progress}
          />
          {/* <Button
            title="Increase Progress"
            theme="default"
            onPress={increaseProgress}
          /> */}
        </View>
      </View>
    </View>
  );

  //objectifs
  const renderItemObjectif = ({ item }) => (
    <View
      className="w-full rounded-2xl p-4"
      style={[styles.shadow, { width: screenWidth - 25 }]}
    >
      <View className=" gap-1" style={{ width: screenWidth }}>
        <View className="container_objectif flex-row gap-10">
          <View className="container_date flex-row  items-center justify-center">
            <Text className=" text-wild_sald-500 text-sm font-raleway-bold ">
              {convertTimestampToDate(item.startDate)}
              {" - "}
            </Text>
            <Text className=" text-wild_sald-500 text-sm font-raleway-bold ">
              {convertTimestampToDate(item.endDate)}
            </Text>
          </View>
          <Text className=" text-primary-600 text-lg font-raleway-bold ">
            somme : {item.montant} Fcfa
          </Text>
        </View>

        <Text className=" font-raleway-medium text-wild_sald-950 text-xl font-semibold w-4/5 ">
          {item.objectif === "" ? (
            <Text className="">
              Vous n'avez pas definir d'objectif pour cette somme
            </Text>
          ) : (
            item.objectif
          )}
        </Text>
      </View>
    </View>
  );

  const name = userDatas.length !== 0 ? userDatas[0].name : "";
  // console.log("userExpenses: ", userExpenses);

  const firstname = userDatas.length !== 0 ? userDatas[0].firstname : "";
  const expenseNumbers = userExpenses.length !== 0 ? userExpenses.length : 3;

  return (
    <View className="container flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* <CustomHeader /> */}
        <View className="subContainer gap-5 px-3">
          <View className="salutations mt-5">
            <Text className=" font-helvitica-bold text-2xl ">
              Bienvenue,{" "}
              {userDatas.length !== 0 ? (
                `${name} ${firstname}`
              ) : (
                <ActivityIndicator color={"orange"} size={"small"} />
              )}
            </Text>
            <Text className=" font-raleway-medium text-xl">Bon retour !!!</Text>
          </View>
          <View className="container_budgets justify-center flex-row gap-2">
            <View
              className="budget justify-center border-[0.5px] border-gray-400 items-center rounded-3xl  bg-purple-100 flex-row gap-2"
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 24,
              }}
            >
              <View className=" py-8 px-2">
                <Text className=" font-raleway-bold text-lg text-center">
                  Votre revenue actuel :{" "}
                </Text>
                <Text className=" font-raleway-bold text-[25px] text-center text-primary-600">
                  {sumIncomes} Fcfa
                </Text>
              </View>
            </View>
            <View
              className="budget justify-center border-[0.5px] border-gray-400 items-center rounded-3xl  bg-purple-100 flex-row gap-2"
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 24,
              }}
            >
              <View className=" py-8 px-2">
                <Text className=" font-raleway-bold text-lg text-center">
                  Votre budget actuel :{" "}
                </Text>
                <Text className=" font-raleway-bold text-[25px] text-center text-primary-600">
                  {sumBudgets} Fcfa
                </Text>
              </View>
            </View>
          </View>
          <View className="spends gap-5">
            <View className="header flex-row gap-5 items-center  ">
              <Text className=" font-helvitica font-bold text-2xl text-center ">
                Mes depenses
              </Text>
              <View className="circle rounded-full w-8 h-8 border border-gray-400 justify-end items-center bg-gray-300">
                <Text className=" text-pink-600  text-lg text-center font-bold">
                  {userExpenses.length !== 0
                    ? expenseNumbers
                    : // <ActivityIndicator color={"orange"} size={"small"} />
                      0}
                </Text>
              </View>
            </View>
            {userExpenses.length === 0 ? (
              <Text className=" text-gray-500 text-lg text-center">
                Vous n'avez encore rien depenser aujourd'hui, bravo !!
              </Text>
            ) : (
              <FlatList
                data={userExpenses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false} // Pour cacher l'indicateur de défilement horizontal
                contentContainerStyle={{ paddingHorizontal: 10 }} // Pour ajouter des styles au conteneur de la FlatList
                ItemSeparatorComponent={ItemSeparator}
              />
            )}
          </View>

          <View className="economy gap-4">
            <View className="header flex-row gap-5 items-center">
              <Text className=" font-helvitica font-bold text-2xl text-center ">
                Mes Economies
              </Text>
            </View>
            {userBudgets.length === 0 ? (
              <ActivityIndicator color={"#bb6c02"} size={"large"} />
            ) : (
              <FlatList
                data={userBudgets}
                renderItem={renderItemEconomy}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false} //
                ItemSeparatorComponent={ItemSeparator}
              />
            )}
          </View>
          <View className="objectif gap-4">
            <View className="header flex-row gap-5 items-center  ">
              <Text className=" font-helvitica font-bold text-2xl text-center ">
                Mes objectifs
              </Text>
            </View>
            {userBudgets.length === 0 ? (
              <ActivityIndicator color={"#bb6c02"} size={"large"} />
            ) : (
              <FlatList
                data={userBudgets}
                renderItem={renderItemObjectif}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false} //
                ItemSeparatorComponent={ItemSeparator}
              />
            )}
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
