import { Text, View } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SeConnecter from '../components/SeConnecter';
import Motdepasseoublie from '../components/Motdepasseoublie';
import createNewmdp from '../components/CreateNewmdp';
import CreateNewmdp from "../components/CreateNewmdp";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Index() {
  const Stack=createNativeStackNavigator()
  return (
    <SafeAreaProvider>
  <NavigationContainer independent={true}>
    <Stack.Navigator>
        
      <Stack.Screen name="Login" component={SeConnecter}  options={{headerShown: false}}/>
      <Stack.Screen name="Mdp" component={Motdepasseoublie}  options={{headerShown: false}}/>
    </Stack.Navigator>
  </NavigationContainer>
    </SafeAreaProvider>
  );
}
