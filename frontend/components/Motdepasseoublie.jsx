import { Text, View,Image ,StyleSheet,TouchableWithoutFeedback,Keyboard} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Button from "@/components/Button";
import Input from "@/components/input";
import React, { useState } from 'react';
function Motdepasseoublie() {
  
    const handlePress = () => {
      console.log('Button pressed!');
    };
    const [text, setText] = useState('');

    const handleTextChange = (newText) => {
      setText(newText);
    };
    const [email, setEmail] = useState('');

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  };
    
  return (
   
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View
      style={styles.container}
    > 
      <View 
        style={styles.imagecontainer}>
              <Image  style={styles.image}source={require('../assets/images/Forgotpassword.png')} />
            <Text style={styles.text}>Entrez votre email d’inscription ci-dessous pour </Text>
            <Text style={styles.text}> recevoir des instructions de renitialisation de </Text>
            <Text style={styles.text}> mot de passe</Text>
      </View>
      <View style={styles.inputcontainer}>    
        <Input
          placeholder="Adresse e-mail"
          value={email}
          onChangeText={handleEmailChange}
          iconType="email" 
          
        />

      </View>
      <View style={styles.buttoncontainer}>
        <Button
                  title="Envoyer"
                  onPress={handlePress}
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
    alignItems: "center",
    backgroundColor:'white',
    display:'flex',
    flexDirection: 'column',
    padding: 10
  },
  imagecontainer:{
    height:'30%',
    width:'100%',
    display:'flex',
    justifyContent:'space-between',
    margin:'10%',
    alignItems:'center', 
  },

  image: {height:'100%',
  margin:'5%'},

  text :{fontSize:15,
    fontWeight:'regular' ,
    fontFamily:"Raleway",
    },

  inputcontainer:{height:'20%', 
  width :'100%',
  marginTop:'20%'},

  buttoncontainer:{height:'50%',
  alignItems:'center',  
  width :'100%',
},

  button:{backgroundColor:'#FFC400',
   width:'95%',height:'20%',
  },
 

});
export default Motdepasseoublie;
  