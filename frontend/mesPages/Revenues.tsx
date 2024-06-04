import React from 'react';
import { FlatList,View,Text,StyleSheet,TouchableOpacity, } from 'react-native';
import PageSwitcher from '../components/PageSwitcher';
import Depense from "../components/Depense";
import Revenue from '@/components/Revenue';

// import { } from 'react-native-reanimated/lib/typescript/Animated';


const Revenues = () => {
  
  const FlatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  const DATA = [
    {
      jour: 'Mercredi',
      date: ' 29/05/2024',
      montant: '50000',
    },
    {jour: 'Vendredi',
      date: ' 30/06/2024',
      montant: '300000',
    },
   
    
  ];
 

  return (
    <View style={styles.container}>
      
    
      
      <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <Revenue
          jour={item.jour}
          montant={item.montant}
          date={item.date}
          
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