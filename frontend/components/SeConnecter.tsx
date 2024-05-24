import { Text, View,Image ,StyleSheet,KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from "@/components/Button";
import Input from "@/components/input";
import React, { useState } from 'react';
import HorizontalLine from "@/components/HorizontalLine";


 function SeConnecter({navigation}:any) {
   
  const insets = useSafeAreaInsets();
    const handlePress = () => {
      console.log('Button pressed!');
    };
    const [text, setText] = useState('');

    const handleTextChange = (newText) => {
      setText(newText);
    };
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
  
    const handlePasswordChange = (newPassword) => {
      setPassword(newPassword);
    }
   
    const handlePhoneNumberChange = (newPhoneNumber) => {
      setPhoneNumber(newPhoneNumber);
    };
  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View
      style={styles.container}
    >   
          <View style={{height:'30%',width:'100%'}}>
            <Image  style={{height:'100%',width:'100%', }}source={require('../assets/images/PgSeconnecter.png')} />
          </View> 
          <View style={styles.textcontainer}>     
              <Text style={{fontSize:30,fontWeight:'bold' ,fontFamily:"Raleway"}}> Se connecter maintenant</Text>
              
              <HorizontalLine/>
              <Text style={{fontSize:15,fontWeight:'regular' ,fontFamily:"Raleway"}}>Bon retour, vous nous avez manqué!!!</Text>
          </View> 
          <View style={styles.inputcontainer}>
            <Input
              placeholder="Numéro de téléphone"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              iconType="phone"
            />
            <Input
              placeholder="Mot de passe"
              value={password}
              onChangeText={handlePasswordChange}
              iconType="password"
            />
            
          </View> 
          <View style={styles.buttoncontainer}>
          < Button
                title="Mot de passe oublie?"
                onPress={()=>navigation.navigate('Mdp')
                }
                style={{backgroundColor:"white", 
                height:'20%',
                 width:'35%',  paddingVertical: 0,
                 paddingHorizontal: 0,}}
                 textStyle={{ color: '#FFC400',fontSize:15 }} 

                 
              /> 
              <Button
                title="Se connecter"
                onPress={handlePress}
                style={{width:'95%'}}
              /> 
          </View>
          <View style={{height:'10%',alignItems:'center', flexDirection: 'row',}}>
              <Text style={styles.text}>
                  Vous n'avez pas de compte?
                  
              </Text> 

              < Button
                title="S'incrire"
                onPress={handlePress}
                style={{backgroundColor:"white", 
                height:'20%',
                 width:'14%',  paddingVertical:0,
                 paddingHorizontal: 0,}}
                 textStyle={{ color: '#FFC400',fontSize:15 }} 
              /> 
          </View>
          <View style={styles.footer}>

          </View>
      </View>
      </TouchableWithoutFeedback>
     
  );
}

const styles = StyleSheet.create({
  container:{
   
    alignItems: "center",
    backgroundColor:'white',
    display:'flex',
    flexDirection: 'column',
    padding : 1

  },
  textcontainer:{height:'10%',
   alignItems:'center', 
  marginTop:'2%'
},
  
  inputcontainer:{height:'15%', 
},

  buttoncontainer:{height:'12%', 
  width : '100%',
  alignItems:'center',
   marginTop:'10%',
  
  display :'flex',
justifyContent:'space-between'},

  text:{fontSize:15,
    fontWeight:'regular' ,
    fontFamily:"Raleway", 
    },
 


  footer:{
    height:'15%',
    width:'100%',
    backgroundColor:'gray'
  },

});
export default SeConnecter;
  

