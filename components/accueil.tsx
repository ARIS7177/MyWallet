import { Image, StyleSheet, Platform,Text, View  } from 'react-native';

import ImageViewer from './ImageViewer';

export default function App() {
    const PlaceholderImage = require('../../assets/images/premiere-page');
    return (
        <View style={styles.container}>
            <ImageViewer PlaceholderImageSource={PlaceholderImage} />
        </View>
    );}
      



const styles = StyleSheet.create({
    container: {
      width:'100%',
      height:'100%',
      flex: 6,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      padding:0,
    },

});