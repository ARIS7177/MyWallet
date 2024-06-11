import React,{useState} from 'react';
import { View, Text,TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getBackgroundColorAsync } from 'expo-system-ui';
import Listedepense from '@/mesPages/Listedepense';
import { format } from 'date-fns';

const Depense = ({ montant,jour, date,depenseId}:any) => {
  const [editable, setEditable] = useState(false);
  const [montantValue, setMontantValue] = useState(montant);
  const [montantModified, setMontantModified] = useState(false);
  const [dateValue, setDateValue] = useState(date);
  const [dateModified, setDateModified] = useState(false);
  const [jourValue, setJourValue] = useState(jour);
  const [jourModified, setJourModified] = useState(false);

  const Modifierdep = (depenseId:any) => {
    setDepenseSelectionnee(depenseId);
    setEditable(true);
    setModificationEffectuee(false);
  };
  
 
  const [modificationEffectuee, setModificationEffectuee] = useState(false);

  const [depenseSelectionnee, setDepenseSelectionnee] = useState(null);

  const ValiderModifications = () => {
    setEditable(false);
    if (montantModified) {
      // Effectuer l'action de sauvegarde du montant modifié
      // par exemple, appeler une fonction pour mettre à jour la base de données
      console.log("Montant modifié :", montantValue);
      setMontantModified(false);
    }
    if (jourModified) {
      // Effectuer l'action de sauvegarde du jour modifié
      // par exemple, appeler une fonction pour mettre à jour la base de données
      console.log("Jour modifié :", jourValue);
      setJourModified(false);
    }
    if (dateModified) {
      // Effectuer l'action de sauvegarde de la date modifiée
      // par exemple, appeler une fonction pour mettre à jour la base de données
      console.log("Date modifiée :", dateValue);
      setDateModified(false);
    }
    setModificationEffectuee(true);
  };
  
    return (
      
      <View style={[styles.depenseContainer, depenseSelectionnee === depenseId && styles.depenseSelectionnee]}>
        <View style={{width:'30%',alignItems:'center',}}>
            
        
        {editable ?(
              <TextInput style={styles.jour}
              value={jourValue} 
              onChangeText={(text) => {
                setJourValue(text);
                setJourModified(true);
              }}
                />
        ) : (
          <Text style={styles.jour}>{jourValue}</Text>
        )}
        
        {editable ?(   
                <TextInput style={styles.date}
                value={dateValue}
                onChangeText={(text) =>  {
                  setDateValue(text);
                  setDateModified(true);
                }}
                />
          
        ) : (
          <Text style={styles.date}>{dateValue}</Text> 
        )}
        </View>
         {editable && !modificationEffectuee && (
        <TouchableOpacity
              onPress={ValiderModifications}
              style={styles.boutonValider}
            >
              <Text style={styles.textValider}>Valider</Text>
            </TouchableOpacity>
             )}
        <View style={{width:'30%',alignItems:'flex-end',}}>

            <TouchableOpacity onPress={Modifierdep} style={styles.boutonModifier}>
              <Feather name="edit" size={20} color="black" />
            </TouchableOpacity>
            
            {editable ?(
                  <TextInput
                    style={styles.montantEditable}
                    value={montantValue}
                    onChangeText={(text) => {setMontantValue(text);setMontantModified(true);}}
                    keyboardType='numeric'
                  /> 
            ) : (
              <Text style={styles.montant}>{montantValue}</Text>
            )}
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