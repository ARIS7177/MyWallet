import React, { useState } from 'react';
import { FlatList,View,Text,StyleSheet,TouchableOpacity,ScrollView, KeyboardAvoidingView } from 'react-native';
import PageSwitcher from '../components/PageSwitcher';
import Depense from "../components/Depense";
import Revenues from './Revenues';
import Listedepense from './Listedepense';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { boolean } from 'zod';


// let [isActive, setisActive] = useState(false)
// import { } from 'react-native-reanimated/lib/typescript/Animated';


interface props{
    isActive: boolean
}
function Transactions  ({isActive=false}:props)  {
    const [page, setPage] = useState("1")
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <View style={styles.pageswitcher}>
      
      <TouchableOpacity
        style={isActive=(page==="1")? styles.selectedButton : styles.button}
        onPress={()=>setPage("1")}
      >
        
        <Text style={isActive? styles.selectedButtonText : styles.buttonText}>Depenses</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={isActive=(page==="2")? styles.selectedButton : styles.button}
        onPress={()=>setPage("2")}
      >
        <Text style={isActive ? styles.selectedButtonText : styles.buttonText}>Revenues</Text>
      </TouchableOpacity>

    
    </View>
      <View style={{width:'100%',height:'80%',}}>
      <PageSwitcher page={page}/>
    </View>
    <View style={styles.barre}>

    </View>
    </View>
    </SafeAreaView>
  );
};
const styles = {
    container: {
      height:'100%',
      width:'100%', 
      backgroundColor:'white',
     
    },
    pageswitcher:{
      width:'100%',
      height:'15%',
      flexDirection:'row', 
      justifyContent:'space-between',
      alignItems:'center',
      paddingHorizontal:'15%'
  },

  barre:{
    height:'10%',
    backgroundColor:'gray',
    
  },
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     marginTop: 20,
    
//   },
  button: {
    backgroundColor: 'gray',
    borderColor: '#FFC400',
    justifyContent:'center',
    paddingHorizontal: 20,
    borderRadius: 20,
    width:110,
    height:50
  },
  selectedButton: {
    backgroundColor: '#FFC400',
    justifyContent:'center',
    paddingHorizontal: 20,
    borderRadius: 20,
    width:110,
    height:50
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight:'bold',
    
  },
  selectedButtonText: {
    color: '#FFF',
    fontSize: 16,
    
  },
    
      
    
  };


export default Transactions;
