
import { StyleSheet, View, Pressable, Text, Linking } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons,AntDesign, Octicons } from '@expo/vector-icons';

// import Boutton from '../Boutton';

export default function BarreDeTache({ label, theme, url }: { theme: string; label: string; url:string }) {
    
    const supportedURL = 'https://google.com';
    // const supporm

      return (
        <View style={styles.barredetache}>
          
          <View >
            <Pressable onPress={
              () => alert('https://google.com')
            } style={styles.bouton}>
              
              <Ionicons name="home-sharp" style={styles.tache} />
              <Text style={styles.Text}> Accueil</Text>
            </Pressable>  
          </View>
          <View  >
            <Pressable onPress={() => alert('transactions')} style={styles.bouton}>
              <MaterialIcons name="compare-arrows" style={styles.tache} />
              <Text style={styles.Text}>Transactions</Text>
            </Pressable>
          </View>
          <View >
            <Pressable onPress={() => alert('Ajouter')} style={styles.bouton}>
              <Octicons name="diff-added" style={styles.tache} />
              <Text style={styles.Text}>Ajouter</Text>
            </Pressable>
          </View>
          <View >
            <Pressable onPress={() => alert('Categorie')} style={styles.bouton}>
              <AntDesign name="appstore-o" style={styles.tache} />
              <Text style={styles.Text}>Categorie</Text>
            </Pressable>
          </View>
          <View >
            <Pressable onPress={() => alert('Statistic')} style={styles.bouton}>
              <MaterialCommunityIcons name="chart-box-outline" style={styles.tache} />
              <Text style={styles.Text}>Stactistic</Text>
            </Pressable>
          </View>
        </View>
      );
    }

const styles = StyleSheet.create({
    
     barredetache : {
        backgroundColor:'#258',
        flexDirection:'row',
        // marginTop: ,
        padding: 15,
        width:'80%',
        alignItems:'center',
        
      },

      bouton :{
          paddingHorizontal:10,
          alignItems: 'center',
      },

      tache:{
        alignItems:'center',
        fontSize: 24,
    
      },

      Text :{
        fontSize: 12,
    },
    

})