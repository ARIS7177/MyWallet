import { Text, View,Image ,StyleSheet, Alert} from "react-native";
import { useSafeAreaInsets,SafeAreaProvider } from 'react-native-safe-area-context';
import Button from "@/components/Button";
import Input from "@/components/input";
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm,Controller } from 'react-hook-form';
import { z } from 'zod';
import PhoneInput from "react-native-phone-number-input";
// import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

function CreateNewmdp({navigation}:any) {
  
    const insets = useSafeAreaInsets();

    const handlePress = () => {
      console.log('Button pressed!');
    };

    const [text, setText] = useState('');

    const handleTextChange = (newText:any) => {
      setText(newText);
    };
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirm] = useState ('');

    const [phoneNumber, setPhoneNumber] = useState('');
  
    // const handlePasswordChange = (newPassword:any) => {
    //   setPassword(newPassword);
    // }
    // const handleConfirmPasswordChange = (newPassword:any) => {
    //   setConfirm(newPassword);
    // }
    
    const validationSchema = z.object({
      password: z.string().min(6, ' Necessite au moins 6 caractères'),
      confirm:z.string().min(6, ' Necessite au moins 6 caractères'),
    });

    type FormData = z.infer<typeof validationSchema>

     
      const { handleSubmit,control, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(validationSchema),
      });
    
      const onSubmit = (data: FormData) => {
        if (data.password !== confirmpassword) {
          Alert.alert('les mots de passe ne correspondent pas');// Les mots de passe ne correspondent pas
          // Gérer le cas d'erreur ici
          return;
        }
       else{
          // Les mots de passe correspondent
        // Effectuer les actions nécessaires avec les données soumises
        console.log(data);
        navigation.navigate('SeConnecter');
       }
        
      };

    
  return (
    
      <View style={styles.container}> 

            <View style={styles.textcontainer}>
                <Text style={styles.bigtext}> Creer un nouveau </Text>
                <Text style={styles.bigtext}>  mot de passe</Text>
                <Text style={styles.smalltext}>Votre nouveau mot de passe doit etre different</Text>
                <Text style={styles.smalltext}>de l'ancien</Text>   
            </View>

            <View style={styles.inputcontainer}>
            <Controller name="password"
                control={control}
                // rules={{ required: true }}
                render={({ field: { onChange,value } }) => (
                <Input
                  placeholder="Mot de passe"
                  value={value}
                  onChangeText={onChange}
                  iconType="password"
                />
              )}
              />
                {errors.password && <Text style={{color:"red"}}>{errors.password.message}</Text>}
                
                <Input
                  placeholder=" Confirmer mot de passe"
                  value={confirmpassword}
                  onChangeText={setConfirm}
                  iconType="password"
                
              />
            </View> 

            <View style={styles.buttoncontainer}>
                <Button
                      title="Envoyer"
                      onPress={handleSubmit(onSubmit)}
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