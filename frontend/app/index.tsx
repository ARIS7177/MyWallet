import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SeConnecter from '../mesPages/SeConnecter';
import Motdepasseoublie from '../mesPages/Motdepasseoublie';
import createNewmdp from '../mesPages/CreateNewmdp';
import CreateNewmdp from "../mesPages/CreateNewmdp";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Listedepense from "../mesPages/Listedepense";
import Revenues from "../mesPages/Revenues";
import Transactions from "@/mesPages/Transactions";

export default function Index() {
  const Stack=createNativeStackNavigator()
  return (
     
   <NavigationContainer independent={true}>
    <Stack.Navigator> 
       <Stack.Screen name="SeConnecter" component={SeConnecter}  options={{headerShown: false}}/>
      <Stack.Screen name="create" component={createNewmdp}  options={{headerShown: true}}/> 
      <Stack.Screen name="Mdp" component={Motdepasseoublie}  options={{headerShown: true}}/>  
       
      <Stack.Screen name="Revenues" component={Revenues}  options={{headerShown:false}}/>  
       
    <Stack.Screen name="Listedepense" component={Listedepense}  options={{headerShown:false}}/>  
      <Stack.Screen name="Transactions" component={Transactions}  options={{headerShown:false}}/>
    </Stack.Navigator>
  </NavigationContainer> 
  
     
  );
}
