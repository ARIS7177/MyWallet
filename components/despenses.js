import { StyleSheet, View,  Text, ScrollView, Pressable } from 'react-native';

export default function MesDepenses( ) {

      return (
       
        <View style={styles.container}> 
            <View style={styles.entete}>
                    <Text style={styles.titre}>Mes dépenses</Text>
                    
                    <View >
                      <Pressable onPress={() => alert('tu as 3 depenses enstand by')} style={styles.bouton}>
                      <Text style={styles.d0}>3</Text>
                      </Pressable>
                    </View>
            </View>
            <ScrollView horizontal={true} style={styles.contain} >
              <View style={styles.depense}>
            
                <View style={styles.deps} >
                    <Text style={styles.d1}>Categorie de ce revenue est </Text>
                    <Text style={styles.d2}>Description de la dépense ...</Text>
                    <Text style={styles.d3}>10 000 Fcfa</Text>
                    <View style={styles.date}>
                        <Text style={styles.d5}/>
                        <Text style={styles.d4}>30 mai 2024</Text>
                    </View>
                </View>
                <View style={styles.deps} >
                    <Text style={styles.d1}>Categorie</Text>
                    <Text style={styles.d2}>Description de la dépense ...</Text>
                    <Text style={styles.d3}>10 000 Fcfa</Text>
                    <View style={styles.date}>
                        <Text style={styles.d5}/>
                        <Text style={styles.d4}>30 mai 2024</Text>
                    </View>
                </View>
                <View style={styles.deps} >
                    <Text style={styles.d1}>Categorie</Text>
                    <Text style={styles.d2}>Description de la dépense ...</Text>
                    <Text style={styles.d3}>10 000 Fcfa</Text>
                    <View style={styles.date}>
                        <Text style={styles.d5}/>
                        <Text style={styles.d4}>30 mai 2024</Text>
                    </View>
                </View>
                <View style={styles.deps} >
                    <Text style={styles.d1}>Categorie</Text>
                    <Text style={styles.d2}>Description de la dépense ...</Text>
                    <Text style={styles.d3}>10 000 Fcfa</Text>
                    <View style={styles.date}>
                        <Text style={styles.d5}/>
                        <Text style={styles.d4}>30 mai 2024</Text>
                    </View>
                </View>
                <View style={styles.deps} >
                    <Text style={styles.d1}>Categorie</Text>
                    <Text style={styles.d2}>Description de la dépense ...</Text>
                    <Text style={styles.d3}>10 000 Fcfa</Text>
                    <View style={styles.date}>
                        <Text style={styles.d5}/>
                        <Text style={styles.d4}>30 mai 2024</Text>
                    </View>
                </View>
                <View style={styles.deps} >
                    <Text style={styles.d1}>Categorie</Text>
                    <Text style={styles.d2}>Description de la dépense ...</Text>
                    <Text style={styles.d3}>10 000 Fcfa</Text>
                    <View style={styles.date}>
                        <Text style={styles.d5}/>
                        <Text style={styles.d4}>30 mai 2024</Text>
                    </View>
                </View>
 
              </View>
            </ScrollView>
        </View>

      );
    }

const styles = StyleSheet.create({
    container: {
        width: 350,
    },
    contain:{
        flex:1,
       
    },
    entete:{
      height:30,
      marginTop: 25,
      marginLeft: -22,
      marginBottom: 20,
      fontWeight:'bold',
      flexDirection:'row',
      // backgroundColor:'#32B550',
    },

    titre: {
        fontSize:20,
        fontWeight:'bold',
    },
    d0:{
      width: 22,
      height: 22,
      padding: 3,
      fontSize: 13,
      paddingTop:-2,
      marginLeft:11,
      marginTop: 5.5,
      borderRadius:20,
      fontWeight:'bold',
      textAlign:'center',
      color:'#DC2626',
      backgroundColor:'#D9D9D9',
    },

    depense: {
        flexDirection:'row',
    },
    deps: {
      margin:6,
      width: 150,
      padding: 10,
      borderRadius: 15,
      textAlign:'right',
      backgroundColor:'#ffffea',

      shadowColor: "#555",
      shadowOffset: {
          width: 0,
          height: 9,
      },
      shadowOpacity: 0.48,
      shadowRadius: 20,
      elevation: 4,
  },
  d1:{
    fontSize: 12,
    color:'#333'
  },
  d2:{
    fontSize: 14.5,
    fontWeight:'bold',
  },
  d3:{
    fontSize: 17.5,
    color:'#E29800',
    fontWeight:'bold',
    margin:5,
    marginLeft: -1,
   },
  date:{
    flexDirection:'row',
    fontWeight:'bold',
    margin: 5 ,
  },
  d4:{
    fontSize: 10.5,
    marginLeft:11,
    fontWeight:'bold',
    color:'#888'
  },
  d5:{
    width:12,
    fontSize: 1,
    margin: 2,
    backgroundColor:'#32B550',
    borderRadius:20,
  },
})