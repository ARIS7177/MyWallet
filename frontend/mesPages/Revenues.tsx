import React , { useEffect, useState }from 'react';
import { FlatList,View,Text,StyleSheet,TouchableOpacity, } from 'react-native';
import PageSwitcher from '../components/PageSwitcher';
import Depense from "../components/Depense";
import Revenue from '@/components/Revenue';

// import { } from 'react-native-reanimated/lib/typescript/Animated';
import { initializeApp } from "firebase/app";
import { getFirestore, DocumentData } from "firebase/firestore";
import { collection, getDocs,doc, deleteDoc } from "firebase/firestore";
import firebase from "firebase/app";
import "firebase/firestore";
import { format } from 'date-fns';


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

// Lire la collection depuis firestore et l'afficher

const collect = collection(FIREBASE_BD, "incomes");
getDocs(collect).then((incomes) => {
  incomes.forEach((income) => {
    console.log(income.data);
  });
});

export { FIREBASE_BD };


const Revenues = () => {
  
  const FlatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  // Initialize Firebase


  const [incomes, setIncomes] = useState<DocumentData[]>([]); // Annotation de type explicite

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const incomesSnapshot = await getDocs(
          collection(FIREBASE_BD, "incomes")
        );
        const incomesData: DocumentData[] = incomesSnapshot.docs.map((doc) =>
          doc.data()
        );
        setIncomes(incomesData);
      } catch (error) {
        console.error("Erreur lors de la récupération des revenues:", error);
      }
    };

    fetchIncomes();
  }, []);
  // const DATA = [
  //   {
  //     jour: 'Mercredi',
  //     date: ' 29/05/2024',
  //     montant: '50000',
  //   },
  //   {jour: 'Vendredi',
  //     date: ' 30/06/2024',
  //     montant: '300000',
  //   },
   
    
  // ];
 

  return (
    <View style={styles.container}>
      
    
      
      <FlatList
      data={incomes}
      renderItem={({ item }) => (
        <Revenue
         
          montant={item.montant}
          
        />
      )}
      ItemSeparatorComponent={FlatListItemSeparator}
      showsVerticalScrollIndicator={false}
    />
    
   
    </View>
  );
};
const styles = {
    container: {
      height:'100%',
      width:'100%', 
      backgroundColor:'white',
     
    },
    separator: {
      height:5,
      backgroundColor: 'white',
      marginHorizontal: 10,
    },

  barre:{
    height:'10%',
    backgroundColor:'gray',
    
  },
    
      
    
  };


export default Revenues;