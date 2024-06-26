import { StyleSheet, View, Pressable, Text } from 'react-native';

import ImageViewer from './ImageViewer';

export default function MesEconomies( ) {
    const Static = require('../assets/images/stat.png');
      return (
            <View style={styles.container}>
                <Text style={styles.titre}>Mes économies</Text>
                <View style={styles.cont}>
                    <View style={styles.deps} >
                        <Text style={styles.d1}>Mois de mai</Text>
                        <Text style={styles.d2}>Bravo vous avez fais des economies de :</Text>
                        <View style={styles.date}>
                            <Text style={styles.d5}>Total :</Text>
                            <Text style={styles.d4}>10 000 Fcfa</Text>
                        </View>
                    </View>
                    <View style={styles.containerStat}>
                    <ImageViewer StaticSource={Static} style={styles.image} />

                    </View>
                </View>
            </View>
            
      );
    }

const styles = StyleSheet.create({
    container: {
        width: 350,
       
    },
    // les economies 
    cont: {
        flexDirection:'row',
        borderRadius : 20,
        backgroundColor:'#ffffff',
        shadowColor: "#555",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.48,
        shadowRadius: 20,
        elevation: 6,
    },
    titre: {
        fontSize:20,
        marginLeft: -22,
        fontWeight:'bold',
        marginBottom : 20,
    },

    deps: {
        padding: 15,
        paddingLeft: 10,
        margin:5,
        width: 230,
        
    },
    d1:{
        fontSize: 13.5,
        color:'#c1c1c1',
        fontWeight:'bold',
        // marginTop : -5,
    },
    d2:{
        fontSize: 16.5,
        fontWeight:'bold',
        marginTop : 5,
        // fontFamily: 'blod',
    },
    d3:{
        fontSize: 17.5,
        color:'#E29800',
        fontWeight:'bold',
        margin:5,
    },
    date:{
        flexDirection:'row',
        margin: 5 ,
    },
    d4:{ 
        fontSize: 12.5,
        color:'#E29800',
        fontWeight:'bold',
    },
    d5:{
        fontSize: 12.5,
        color:'#c1c1c1',
        fontWeight:'bold',
    },
    
    // les statistics
    containerStat: {
        width: 100,
        marginLeft: 10,
        // backgroundColor: 'blue',
    },
})