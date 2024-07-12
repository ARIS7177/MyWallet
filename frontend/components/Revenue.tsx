import React ,{useState}from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getBackgroundColorAsync } from 'expo-system-ui';
import Listedepense from '@/mesPages/Listedepense';



const Revenue = ({ montant,source, date }:any) => {
  const [montantValue, setMontantValue] = useState(montant);
  
  const [dateValue, setDateValue] = useState(date);
 
 
  const [sourceValue, setsourceValue] = useState(source);
 
 
  const [modificationEffectuee, setModificationEffectuee] = useState(false);

  const [depenseSelectionnee, setDepenseSelectionnee] = useState(null);
  const ModifierRev  = () => {
   
  };
    return (
      <View style={styles.container}>
        <View style={{width:'50%',}}>
        <Text style={styles.source}>{sourceValue}</Text>
        {/* <Text style={styles.date}>{dateValue}</Text> */}
        </View>
        <View style={{width:'30%',alignItems:'center',padding: 10,}}>
        
        <Text style={styles.montant}>{montant}</Text>
        </View>
      </View>
    );
  };
 
  const styles = {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: '#888',
      borderRadius: 8,
      height:60,
      width:"100%",
      justifyContent:'space-between',
    
      backgroundColor:'#f6f5fd',
      
    },
    montant: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      color:'green',
      alignSelf:'center'
    },
    date: {
      fontSize: 16,
      color: 'black',
      marginRight: 10,
      fontWeight: 'bold',
    },
    source: {
      fontSize: 16,
      color: 'black',
      marginRight: 10,
      fontWeight: 'bold',
    },
    boutonModifier: {
      marginLeft: 10,
    },
  };

  export default Revenue;