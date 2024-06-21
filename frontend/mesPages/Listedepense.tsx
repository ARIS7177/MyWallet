import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import PageSwitcher from "../components/PageSwitcher";
import Depense from "../components/Depense";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { initializeApp } from "firebase/app";
import { getFirestore, DocumentData } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import firebase from "firebase/app";
import "firebase/firestore";
import { format } from 'date-fns';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAolxF8zqSV4j00f_mui5cHPkB8uoeMbJY",
  authDomain: "my-wallet-c974a.firebaseapp.com",
  projectId: "my-wallet-c974a",
  storageBucket: "my-wallet-c974a.appspot.com",
  messagingSenderId: "709422119160",
  appId: "1:709422119160:web:de51babc1dfaab8f37e30d",
  measurementId: "G-R0BLMEGYPX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FIREBASE_BD = getFirestore(app);

// Read collection from Firestore and print it

const collect = collection(FIREBASE_BD, "expenses");
getDocs(collect).then((expenses) => {
  expenses.forEach((expense) => {
    console.log(expense.data);
  });
});

export { FIREBASE_BD };

const Listedepense = () => {
  const [expenses, setExpenses] = useState<DocumentData[]>([]); // Annotation de type explicite

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expensesSnapshot = await getDocs(
          collection(FIREBASE_BD, "expenses")
        );
        const expensesData: DocumentData[] = expensesSnapshot.docs.map((doc) =>
          doc.data()
        );
        setExpenses(expensesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des dépenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const FlatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  // const [DATA,setData] = useState([
  //   {jour: 'Mercredi',date: ' 29/05/2024',montant: '5000', editable: false},
  //   {jour: 'jeudi',date: ' 30/05/2024', montant: '3000', editable: false},
  //   {jour: 'Mercredi',date: ' 29/05/2024',montant: '5000', editable: false},
  //   {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000', editable: false },
  //   {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000',  editable: false},
  //   {jour: 'Mercredi',date: ' 29/05/2024',      montant: '5000', editable: false },
  //   {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000',  editable: false},
  //   {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000',  editable: false},
  //   {jour: 'Mercredi',date: ' 29/05/2024',      montant: '5000', editable: false },
  //   {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000',  editable: false},
  //   {jour: 'Mercredi',date: ' 29/05/2024',      montant: '5000', editable: false },

  // ]);

  return (
    
      <View style={styles.container}>
        {/* <Text style={styles.text}>
                Ici vous pourez consulter l'historique 
              </Text>
              <Text style={styles.text}>
              de vos depenses. Pour  l'instant vous n'en 
              </Text>
              <Text style={styles.text}>
              avez enregistre aucune.
              </Text>   */}

        <KeyboardAwareFlatList
          data={expenses}
          renderItem={({ item }) => (
            <Depense  montant={item.montant}  
            date={item.timestamp.toDate().toLocaleString()}
            timestamp={format(item.timestamp.toDate(), 'EEEE')} />
          )}
          ItemSeparatorComponent={FlatListItemSeparator}
          showsVerticalScrollIndicator={false}
        />
      </View>
    
  );
};

const styles = {
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "",
    paddingHorizontal: 10,
    display: "flex",

    alignItems: "center",
  },
  separator: {
    height: 8,
    backgroundColor: "white",
    marginHorizontal: 10,
  },

  // text:{
  //   fontSize:20,
  //   fontWeight:'medium' ,
  //   fontFamily:"Raleway",

  // }
};

export default Listedepense;
