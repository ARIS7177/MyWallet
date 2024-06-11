import { Text, View,Image ,StyleSheet,TouchableWithoutFeedback,Keyboard} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Button from "@/components/Button";
import Input from "@/components/input";
import React, { useState } from 'react';
import PhoneNumberInput from "../components/PhoneNumber";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm,Controller } from 'react-hook-form';
import { z } from 'zod';


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
    const validationSchema = z.object({
      phone: z.string().min(9,'Le numéro doit respecter le format a 9 chifres').max(9,'Le numéro doit respecter le format a 9 chifres'),
      
    });
    type FormData = z.infer<typeof validationSchema>

         
    const { handleSubmit,control, formState: { errors } } = useForm<FormData>({
      resolver: zodResolver(validationSchema),
    });
  
    const onSubmit = (data:FormData) => {
      console.log(data); 
     
       navigation.navigate('create')
      // Faire quelque chose avec les données soumises
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
            <Controller name="phone"
            control={control}
            // rules={{ required: true }}
            render={({ field: { onChange} }) => ( 
              <PhoneNumberInput  onChangeText={onChange} />
            )}
            />
          
          {errors.phone && <Text style={{color:"red"}}>{errors.phone.message}</Text>}
            </View>

            <View style={styles.buttoncontainer}>
                <Button
                        title="Envoyer"
                        onPress={handleSubmit(onSubmit)}//
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
    height:'40%',
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
  