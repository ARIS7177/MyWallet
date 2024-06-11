import { Text, View,Image ,StyleSheet,TouchableWithoutFeedback, Keyboard,Alert} from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from "@/components/Button";
import Input from "@/components/input";
import React, { useState , useRef} from 'react';
import HorizontalLine from "@/components/HorizontalLine";
import SocialButtons from '../components/SocialButtons';
import PhoneNumberInput from "../components/PhoneNumber";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm,Controller } from 'react-hook-form';
import { z } from 'zod';
import PhoneInput from "react-native-phone-number-input";





 function SeConnecter({navigation}:any){

 
  const phoneInput = useRef(null);

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
        
      
        const handlePasswordChange = (newPassword : any) => {
          setPassword(newPassword);
        }
      
        const handlePhoneNumberChange = (newPhoneNumber : any) => {
          
          setPhoneNumber(newPhoneNumber);
        }
        const validationSchema = z.object({
          phone: z.string().min(9,'Le numéro doit respecter le format a 9 chifres').max(9,'Le numéro doit respecter le format a 9 chifres'),
          password: z.string().min(6, ' Necessite au moins 6 caractères'),
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
    <SafeAreaView>
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.container}>  

            <View style={{height:'30%',width:'100%'}}>
              <Image  style={{height:'100%',width:'100%', }}source={require('../assets/images/PgSeconnecter.png')} />
            </View> 

            <View style={styles.textcontainer}>     
                <Text style={{fontSize:30,fontWeight:'bold' ,fontFamily:"Raleway"}}> Se connecter maintenant</Text>
                <HorizontalLine/>
                <Text style={{fontSize:15,fontWeight:'regular' ,fontFamily:"Raleway"}}>Bon retour, vous nous avez manqué!!!</Text>
            </View> 

            <View style={styles.inputcontainer}>

            <Controller name="phone"
            control={control}
            // rules={{ required: true }}
            render={({ field: { onChange} }) => (
                <PhoneNumberInput onChangeText={onChange}/>
              )}
                />
              
              {errors.phone && <Text style={{color:"red"}}>{errors.phone.message}</Text>}

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

            </View> 

            <View style={styles.buttoncontainer}>
                < Button
                  title="Mot de passe oublie?"
                  onPress={()=>navigation.navigate('Mdp')}
                  style={{backgroundColor:"white", 
                  height:'20%',
                  width:'40%', 
                  alignSelf:'flex-end',
                   paddingVertical: 0,
                  paddingHorizontal: 0,
                  }}

                  textStyle={{ color: '#FFC400',fontSize:15 }}   
                /> 
                <Button
                  title="Se connecter"
                  onPress={handleSubmit(onSubmit)}
                  style={{width:'95%' }}
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
                  width:'16%',  paddingVertical:0,
                  paddingHorizontal: 0,}}
                  textStyle={{ color: '#FFC400',fontSize:15 }} 
                /> 
            </View>

            <View style={styles.footer1}>
              <HorizontalLine  />
              <Text style={{fontSize:15,fontWeight:'regular' ,fontFamily:"Raleway"}}>
                ou
              </Text>
              <HorizontalLine />
            </View>

            <View style={styles.footer2}>
              <SocialButtons />
            </View>
        </View>
      </TouchableWithoutFeedback>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container:{
    alignItems: "center",
    backgroundColor:'white',
    display:'flex',
    flexDirection: 'column',
    padding : 1,
    justifyContent:'space-between',
    
  },

  textcontainer:{
    height:'10%',
    alignItems:'center', 
  },
  
  inputcontainer:{
    height:'18%', 
    
  },

  buttoncontainer:{
    height:'20%', 
    width : '100%',
    alignItems:'center',
    justifyContent:'space-around',
    display :'flex',
    

  },

  text:{
    fontSize:15,
    fontWeight:'regular' ,
    fontFamily:"Raleway", 
  },

  footer1:{
      height:'3%',
      width:'100%',
      flexDirection: 'row',
      justifyContent:'center',
    },

  footer2:{
    height:'10%',
    width:'100%',
  },

});

export default SeConnecter;
  

