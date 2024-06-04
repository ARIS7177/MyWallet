import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

const SocialButtons = () => {
  const handleGooglePress = () => {
    // Gérer l'action du bouton Google
  };

  const handleLinkedInPress = () => {
    // Gérer l'action du bouton LinkedIn
  };

  const handleFacebookPress = () => {
    // Gérer l'action du bouton Facebook
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleGooglePress}>
        <AntDesign name="google" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleFacebookPress}>
        <Ionicons name="logo-facebook" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLinkedInPress}>
        <FontAwesome name="linkedin" size={24} color="black" />
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#ECECEC',
    borderRadius: 8,
    padding: 12,
    margin: 5
  },
});

export default SocialButtons;