import { Text, View,Image ,StyleSheet} from "react-native";
import { useSafeAreaInsets,SafeAreaProvider } from 'react-native-safe-area-context';
import Button from "@/components/Button";
import Input from "@/components/input";
import React, { useState } from 'react';

function CreateNewmdp() {
  
    const insets = useSafeAreaInsets();

    const handlePress = () => {
      console.log('Button pressed!');
    };

    const [text, setText] = useState('');

    const handleTextChange = (newText:any) => {
      setText(newText);
    };
    const [password, setPassword] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
  
    const handlePasswordChange = (newPassword:any) => {
      setPassword(newPassword);
    }
    
  return (
    
      <View style={styles.container}> 

            <View style={styles.textcontainer}>
                <Text style={styles.bigtext}> Creer un nouveau </Text>
                <Text style={styles.bigtext}>  mot de passe</Text>
                <Text style={styles.smalltext}>Votre nouveau mot de passe doit etre different</Text>
                <Text style={styles.smalltext}>de l'ancien</Text>   
            </View>

            <View style={styles.inputcontainer}>
              
                <Input
                  placeholder="Mot de passe"
                  value={password}
                  onChangeText={handlePasswordChange}
                  iconType="password"
                />
                <Input
                  placeholder=" Confirmer mot de passe"
                  value={password}
                  onChangeText={handlePasswordChange}
                  iconType="password"
                />
                
            </View> 

            <View style={styles.buttoncontainer}>
                <Button
                      title="Envoyer"
                      onPress={handlePress}
                      style={styles.button}
                  /> 
            </View>

            <View style={styles.vide}>

            </View>
          
        </View>
     
  );
}
const styles = StyleSheet.create({
 container:{
   
    height:'100%',
    width:'100%',
    backgroundColor:'white',
    padding:1,
    display:'flex',
    flexDirection:'column'
 },
 
 inputcontainer:{
    width:'100%',
    height:'15%'
 },

 textcontainer:{ 
    height:'15%',
    width:'100%',
    alignItems:'center', 
    marginTop:'20%',
    
 },

 bigtext:{
  fontSize:30,
    fontWeight:'bold' ,
    fontFamily:"Raleway"},

smalltext:{
      fontSize:20,
      fontWeight:'regular' ,
      fontFamily:"Raleway"
    },


buttoncontainer:{
    height:'15%', 
    width : '100%',
    alignItems:'center',
    display:'flex',
    justifyContent:'flex-end'
},

button:{
  backgroundColor:'#FFC400', 
  width:'95%',height:'50%',
  display:'flex', 
  justifyContent:'center'
},

 vide:{
  width:'100%',
  height:"50%",
 }

});
export default CreateNewmdp;