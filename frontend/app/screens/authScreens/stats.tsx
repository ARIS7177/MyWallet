// import React from "react";
// import { StyleSheet, View, Text } from "react-native";

// const Stats = () => {
//   return (
//     <View>
//       <Text>Stat screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({});

// export default Stats;

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore, DocumentData } from "firebase/firestore";
import { collection, getDocs,doc, deleteDoc } from "firebase/firestore";
import firebase from "firebase/app";
import "firebase/firestore";
import { format } from 'date-fns';
//  import { VictoryPie } from 'victory-native';
import { PieChart } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
  
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

// Lire la collection depuis firestore et l'afficher

const collect = collection(FIREBASE_BD, "expenses");
getDocs(collect).then((expenses) => {
  expenses.forEach((expense) => {
    console.log(expense.data);
  });
});

export { FIREBASE_BD };

const AnalyseFinanciere = () => {
  const [totalDepenses, setTotalDepenses] = useState<number>(0);
  const [depensesParCategorie, setDepensesParCategorie] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesSnapshot = await getDocs(collection(FIREBASE_BD, 'expenses'));
        const expenses: { montant: number; categorie: string }[] = [];

        expensesSnapshot.forEach((doc) => {
          const expense = doc.data()as { montant: number; categorie: string };
          expenses.push(expense);
        });

    // Calcul du total des dépenses
    const total = expenses.reduce((sum, expense) => sum + expense.montant, 0);
    setTotalDepenses(total);

    // Regroupement des dépenses par catégorie
    const depensesParCategorie = expenses.reduce((result, expense) => {


      // si une categorie existe deja on ajoute le montant de la depense 
      if (result[expense.categorie]) {
        result[expense.categorie] += expense.montant;
      } 
      //sinon on cree un nouvel objet avec la categorie et le montant 
      else {
        result[expense.categorie] = expense.montant;
      }
      return result;
      }, {});
      setDepensesParCategorie(depensesParCategorie);
      } 
        catch (error) {
          console.error('Erreur lors de la récupération des données de Firebase Firestore:', error);
      }
      
    };

fetchData();
}, []);

// const data = Object.entries(depensesParCategorie).map(([categorie, montant]) => ({
//   x: categorie,
//   y: montant,
// }));

// const getRandomColor = () => {
//   const colors = ['#FF6E54', '#FFD54F', '#4FC3F7', '#AED581', '#F06292', '#9575CD', '#4DD0E1', '#FF8A65'];
//   const randomIndex = Math.floor(Math.random() * colors.length);
//   return colors[randomIndex];
// };





  return (
    <View style={styles.container}>
      <View style={styles.total}>
        <Text style={styles.text}>Total des dépenses : {totalDepenses.toString()}</Text>
      </View>
      <View style={styles.categorie} >
      <Text style={styles.text}>Analyse par catégorie :</Text>
      {Object.entries(depensesParCategorie).map(([categorie, montant]) => (
        <Text key={categorie} style={styles.text}>
          {categorie}: {montant.toString()}
        </Text>
        
      ))}

      </View>
      
{/* <VictoryPie
        data={data}
        colorScale={['#FF6E54', '#FFD54F', '#4FC3F7', '#AED581', '#F06292', '#9575CD', '#4DD0E1', '#FF8A65']}
        innerRadius={70}
        labels={({ datum }) => `${datum.x}\n${datum.y}`}
        labelRadius={85}
      /> */}

    </View>
  );
};
const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    
    
    height:'100%',
    width:"100%",
    
    backgroundColor:'white',
    
  },
  total:{
    height:'10%',
    width:"100%",
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
  },
  categorie:{
    height:'60%',
    width:"100%",
    alignItems: 'center',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
  },
  text :{
    fontSize:30,
    fontWeight:'regular' ,
    fontFamily:"Raleway",
    },

};


export default AnalyseFinanciere;