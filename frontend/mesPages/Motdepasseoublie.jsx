import { Text, View,Image ,StyleSheet,TouchableWithoutFeedback,Keyboard} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Button from "@/components/Button";
import Input from "@/components/input";
import React, { useState } from 'react';
import PhoneNumberInput from "../components/PhoneNumber";


function Motdepasseoublie({navigation}) {
  
    const handlePress = () => {
      console.log('Button pressed!');
    };

    const [text, setText] = useState('');

    const handleTextChange = (newText) => {
      setText(newText);
    };

    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePhoneNumberChange = (newPhoneNumber) => {
      setPhoneNumber(newPhoneNumber);
    };
    
  return (
   
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.container}> 

            <View style={styles.imagecontainer}>
                    <Image  style={styles.image}source={require('../assets/images/Forgotpassword.png')} />
                  <Text style={styles.text}>Entrez votre numero de telephone d’inscription </Text>
                  <Text style={styles.text}> ci-dessous pour recevoir des instructions  </Text>
                  <Text style={styles.text}>de renitialisation de mot de passe</Text>
            </View>

            <View style={styles.inputcontainer}>    
              <PhoneNumberInput placeholder="Numero de telephone" />
            </View>

            <View style={styles.buttoncontainer}>
                <Button
                        title="Envoyer"
                        onPress={handlePress}//
                        style={styles.button}
                /> 
            </View>
          </View>
      </TouchableWithoutFeedback>
    
  );
}
const styles = StyleSheet.create({

  container:{
    flex: 1,
    height:'100%',
    width:'100%',
    alignItems: "center",
    backgroundColor:'white',
    display:'flex',
    flexDirection: 'column',
    justifyContent:'space-between'
  },
  
  imagecontainer:{
    height:'50%',
    width:'100%',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center', 
  },

  image: {
    height:'80%',
    width:'100%',
  },

  text :{
    fontSize:18,
    fontWeight:'regular' ,
    fontFamily:"Raleway",
    },

  inputcontainer:{
    height:'20%', 
    width :'100%', 
    display:'flex',
    justifyContent:'center', 
  },

  buttoncontainer:{
    height:'50%',
    alignItems:'center',  
    width :'100%',
},

  button:{
    backgroundColor:'#FFC400',
    width:'95%',height:'15%',
  },
 

});
export default Motdepasseoublie;
  