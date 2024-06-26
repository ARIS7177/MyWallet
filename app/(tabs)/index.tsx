
import { StatusBar } from 'expo-status-bar';
// import Svg, { Path } from "react-native-svg"
import { LogBox, StyleSheet, Text, View, ScrollView,Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';


import ImageViewer from '../../components/ImageViewer';
import Boutton from '../../components/Boutton';
import MesDepenses from '../../components/despenses';
import MesEconomies from '../../components/economies';
import MesObjectifs from '../../components/objectifs';
import BarreDeTache from '../../components/barredetache';

 
export default function App() {
  const PlaceholderImage = require('../../assets/images/MWicon.png');
  // const Static = require('../../assets/images/')
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.image}>
            
              <ImageViewer PlaceholderImageSource={PlaceholderImage} />
              <Text  style={styles.my}>My Wallet</Text>
            
          </View>
          <View style={styles.profil}>
            <Pressable onPress={() => alert('Notification')} style={styles.bouton}>
              <MaterialCommunityIcons name="bell-badge"  style={styles.bouton}/>
            </Pressable>
            <Pressable onPress={() => alert('Profil')} style={styles.bouton}>
              <Ionicons name="person-circle-outline"  style={styles.bouton} />
            </Pressable>
          </View>
        </View>
        <View>
          <View style={styles.bienvenue}>
             <Text style={{fontSize:25, margin:5, fontWeight:'bold' }}>Hello, Donie</Text>
             <Text style={{fontSize:20, margin:5, marginTop: -6 }}>Bon retour !!!</Text>
          </View>
        </View>
        <ScrollView style={styles.boxContainer}>
          <View style={styles.solde} >
            <Text style={{fontSize:20, margin:5, marginTop: -6, fontWeight:'bold', }}>Solde :</Text>
            <Text style={styles.solde1}>50 000 Fcfa</Text>
          </View>
          <View style={styles.box}>
            <MesDepenses />
          <StatusBar style="auto" />
          </View>
          
          <View style={styles.box}>
           <MesEconomies />
          </View>
          <View style={styles.box}>
            <MesObjectifs />
          </View>
          
        </ScrollView>
       <View>
          {/* <BarreDeTache /> */}
        </View>
    </View>
     
  );
}

const styles = StyleSheet.create({
    container: {
      width:'100%',
      height:'100%',
      flex: 6,
      backgroundColor: '#ffffea',
      // alignItems: 'center',
      padding:0,
      margin:1,
      paddingRight:10,
    },

    //entete
        bienvenue:{
          
          width:'100%',
          alignItems:'flex-start',
          paddingLeft:10,
          backgroundColor: '#ffffff',
        },
        imageContainer: {
        width: '100%',
        flex: 1/12,
        marginTop:35,
        paddingLeft: 8,
        paddingTop: 10,
        // marginLeft:-27,
        flexDirection:'row',
        backgroundColor: '#ffffea',
        shadowColor: '#000',
       

      
      },
      image: {
        width: 100,
        height: 70,
        borderRadius: 18,
        flexDirection:'row',
        marginTop:-1,
        // alignItems:'flex-start',
        // backgroundColor:'#f25252'
      },
      my: {
        marginTop: 13.5,
        fontSize: 17,
        marginLeft: 10,
        fontWeight:'bold',
      },
      profil: {
        flexDirection:'row',
        marginLeft:'50%',
        // backgroundColor: '#555',
      },
      bouton :{
        fontSize:33, 
        color:"black",
        paddingHorizontal:3.5,
        alignItems: 'center',
        
    },

    //different box
         boxContainer:{
          // flex: 1 ,
          padding:20,
         
          backgroundColor: '#ffffff',
        }, 
        box:{
          flex: 1 ,
          padding:10,
          // marginTop:30,
          backgroundColor: '#ffffff',
          borderRadius:10,
          margin:10,
        },
        solde:{
          width:'100%',
          flex: 1/3 ,
          fontSize:20,
          backgroundColor: '#EFECFB',
          alignItems:'center',
          borderRadius:50,
          padding:35,
          borderColor:'black',

          shadowColor: "#555",
          shadowOffset: {
              width: 0,
              height: 9,
          },
          shadowOpacity: 0.48,
          shadowRadius: 20,
          elevation: 4,
        },
        solde1:{
          borderColor:'#000',
          
          color:'#E29800',
          fontSize: 32,
          borderBottomColor: '#E29800',
          fontWeight:'bold'
        },
       
    // footerContainer: {
      // flex: 1 /3,
    //   alignItems: 'center',
    // },
  });