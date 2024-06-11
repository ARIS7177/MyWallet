import React, { useState,useRef } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { MaterialIcons  } from '@expo/vector-icons';
import PhoneInput from 'react-native-phone-number-input';

interface props{
  onChangeText : any
}
const PhoneNumberInput = ({onChangeText}:props) => {

  const [phoneNumber, setPhoneNumber] = useState('');
  

 
  
  return (
    

      <PhoneInput
       
       defaultValue={phoneNumber}
       defaultCode='CM'
       layout='first'
       onChangeFormattedText={text =>{setPhoneNumber(text);}}
       containerStyle={styles.container}
       textContainerStyle={styles.textContainer}
       onChangeText={onChangeText}
       
      />
       
      
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding:2.5,
    margin : 10,
    height : "40%",
    width :"95%",
    backgroundColor :'#F6F5FD'
  },
  textContainer:{
    height:'100%',
    backgroundColor :'#F6F5FD',
    justifyContent:'center',
    
  },
  
  input: {
    flex: 1,
    fontSize:10
  },

});

export default PhoneNumberInput;