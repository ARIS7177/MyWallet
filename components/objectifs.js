import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function MesOBjectifs( ) {

      return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.titre}>Mes objectifs</Text>
                </View>
                <View style={styles.contain}>
                    <Text style={styles.d1}>Mois de mai</Text>
                    <Text style={styles.d2}>vous avez economiser 20% ! de mon revenue</Text>
                </View>
                
            </View>
      );
    }

const styles = StyleSheet.create({
    container: {
        width: 350,
        marginBottom: 50,
        flex : 1,
        // marginTop: 30,

    },
    titre: {
        fontSize:20,
        marginLeft: -22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    contain:{
        padding:15,
        borderRadius:20,
        backgroundColor:'#ffffff',
        shadowColor: "#555",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 20,
        elevation: 6,
    },

    depense: {
        flexDirection:'row',
    },
    deps: {
      backgroundColor:'#999',
      padding: 15,
      borderRadius : 5,
      margin:5,
  },
  d1:{
    fontSize: 14,
    color:'#c1c1c1',
    fontWeight:'bold',
  },
  d2:{
    marginTop: 5,
    fontSize: 16,
    fontWeight:'bold',
  },
})