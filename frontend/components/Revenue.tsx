import React ,{useState}from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getBackgroundColorAsync } from 'expo-system-ui';
import Listedepense from '@/mesPages/Listedepense';



const Revenue = ({ montant,timestamp, date }:any) => {
  const [montantValue, setMontantValue] = useState(montant);
  
  const [dateValue, setDateValue] = useState(date);
 
 
  const [timestampValue, settimestampValue] = useState(timestamp);
 
 
  const [modificationEffectuee, setModificationEffectuee] = useState(false);

  const [depenseSelectionnee, setDepenseSelectionnee] = useState(null);
  const ModifierRev  = () => {
   
  };
    return (
      <View style={styles.container}>
        <View style={{width:'30%',alignItems:'center',}}>
        <Text style={styles.jour}>{timestampValue}</Text>
        <Text style={styles.date}>{dateValue}</Text>
        </View>
        <View style={{width:'30%',alignItems:'flex-end',}}>
        <TouchableOpacity onPress={ModifierRev } style={styles.boutonModifier}>
          <Feather name="edit" size={20} color="black" />
        </TouchableOpacity>
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
      backgroundColor:'white',
      
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
    jour: {
      fontSize: 14,
      color: '#888',
      marginRight: 10,
      fontWeight: 'bold',
    },
    boutonModifier: {
      marginLeft: 10,
    },
  };

  export default Revenue;