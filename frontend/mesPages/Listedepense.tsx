import React,{ useState }from 'react';
import { FlatList,View,Text,StyleSheet,TouchableOpacity, } from 'react-native';
import PageSwitcher from '../components/PageSwitcher';
import Depense from "../components/Depense";
import { SafeAreaView } from 'react-native-safe-area-context';

// import { } from 'react-native-reanimated/lib/typescript/Animated';


const Listedepense = () => {
 
  const FlatListItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  const [DATA,setData] = useState([ 
    {jour: 'Mercredi',date: ' 29/05/2024',montant: '5000',},
    {jour: 'jeudi',date: ' 30/05/2024', montant: '3000',},
    {jour: 'Mercredi',date: ' 29/05/2024',montant: '5000',},
    {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000', },
    {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000', },
    {jour: 'Mercredi',date: ' 29/05/2024',      montant: '5000', },
    {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000', },
    {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000', },
    {jour: 'Mercredi',date: ' 29/05/2024',      montant: '5000', },
    {jour: 'Mercredi',date: ' 29/05/2024', montant: '5000', },
    {jour: 'Mercredi',date: ' 29/05/2024',      montant: '5000', },
       
  ]);
  
 

  return (
    
    <View style={styles.container}>
    
      <FlatList
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
    
  );
};
const styles = {
    container: {
      height:'110%',
      width:'100%', 
      backgroundColor:'white',
      paddingLeft:10,
      paddingRight:10
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