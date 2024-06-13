import React , { useState }from 'react';
import { TextInput, StyleSheet,View } from 'react-native';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';



const Input = ({ placeholder, value, onChangeText, iconType }:any) => {

  const [secureTextEntry, setSecureTextEntry] = useState(iconType === 'password');

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  
  const getIcon = () => {

    if (iconType === 'password') {
      return (
        <FontAwesome
          name={secureTextEntry ? 'eye' : 'eye-slash'}
          size={20}
          color="#888"
          onPress={toggleSecureTextEntry}
          
        />
      );
    } 
    else if (iconType === 'phone') {
      return (
        <MaterialIcons
          name="phone"
          size={20}
          color="#888"
          
        />
      );
    }
      else if (iconType === 'email') {
          return (
            <MaterialIcons
              name="email"
              size={20}
              color="#888"
              
            />
          );
      
    }

    return null;
  };

  return (
    <View style={styles.inputContainer}>
      
      <TextInput
     
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText} 
      />
      {getIcon()}
    </View>
  );
};

const styles = StyleSheet.create({

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    margin : 10,
    height : "40%",
    width :"95%",
    backgroundColor :'#F6F5FD' 
  },

  input: {
    flex: 1,
    fontSize:18
  },

});

export default Input;