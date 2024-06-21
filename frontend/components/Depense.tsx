import React,{useState} from 'react';
import { View, Text,TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getBackgroundColorAsync } from 'expo-system-ui';
import Listedepense from '@/mesPages/Listedepense';
import { format } from 'date-fns';

const Depense = ({ montant,timestamp,date,depenseId}:any) => {
  
  const [montantValue, setMontantValue] = useState(montant);
  
  const [dateValue, setDateValue] = useState(date);
 
 
  const [timestampValue, settimestampValue] = useState(timestamp);
 

 
 
  const [modificationEffectuee, setModificationEffectuee] = useState(false);

  const [depenseSelectionnee, setDepenseSelectionnee] = useState(null);

 
    return (
      
      <View style={styles.depenseContainer}>

        <View style={{width:'30%',alignItems:'center',}}>
            
           <Text style={styles.jour}>{timestampValue}</Text>
           <Text style={styles.date}>{dateValue}</Text> 
        
        </View>

             
        <View style={{width:'30%',alignItems:'flex-end',}}>
        <TouchableOpacity  style={styles.boutonModifier}>
              <Feather name="trash" size={20} color="black" />
            </TouchableOpacity>

              <Text style={styles.montant}>{montantValue}</Text>
            
        </View>
      </View>
    );
  };
 
  const styles = {
    depenseContainer: {
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
    depenseSelectionnee: {
      backgroundColor: '#e6f7ff',
      borderColor: '#1890ff',
      height:80,
    },
    montant: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      color:'red',
      alignSelf:'center'
    },
    montantEditable: {
      flex: 1,
      fontSize: 16,
      fontWeight: 'bold',
      color: 'red', // Exemple de couleur différente pour le montant en mode édition
      alignSelf: 'center',
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
    boutonValider: {
      marginTop: 10,
      backgroundColor: 'green',
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    textValider: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  };

  export default Depense;