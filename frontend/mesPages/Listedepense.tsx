import React,{ useState } from 'react';
import { FlatList,View,Text,StyleSheet,TouchableOpacity, ScrollView, KeyboardAvoidingView} from 'react-native';
import PageSwitcher from '../components/PageSwitcher';
import Depense from "../components/Depense";
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

// import { } from 'react-native-reanimated/lib/typescript/Animated';


const Listedepense = () => {
 
  const FlatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  
  const [DATA,setData] = useState([ 
    {jour: 'Mercredi',date: ' 29/05/2024',montant: '5000', editable: false},
    {jour: 'jeudi',date: ' 30/05/2024', montant: '3000', editable: false},
    {jour: 'Mercredi',date: ' 29/05/2024',montant: '5000', editable: false},
    {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000', editable: false },
    {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000',  editable: false},
    {jour: 'Mercredi',date: ' 29/05/2024',      montant: '5000', editable: false },
    {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000',  editable: false},
    {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000',  editable: false},
    {jour: 'Mercredi',date: ' 29/05/2024',      montant: '5000', editable: false },
    {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000',  editable: false},
    {jour: 'Mercredi',date: ' 29/05/2024',      montant: '5000', editable: false },
       
  ]);
  
 

  return (
    
    <ScrollView>
    
    <View style={styles.container}>
   
    <KeyboardAwareFlatList
        data={DATA}
        renderItem={({ item }) => (
          <Depense
            jour={item.jour}
            montant={item.montant}
            date={item.date}
            
          />
        )}
        ItemSeparatorComponent={FlatListItemSeparator} 
        showsVerticalScrollIndicator={false}
      />
      
    </View>
    
    </ScrollView>
    
  );
};
const styles = {
    container: {
      height:'110%',
      width:'100%', 
      backgroundColor:'white',
      paddingHorizontal:10,
      
    },
    separator: {
      height:8,
      backgroundColor: 'white',
      marginHorizontal: 10,
    },

  barre:{
    height:'10%',
    backgroundColor:'gray',
    
  },
    
      
    
  };


export default Listedepense;