import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizontalLine = () => {
  return (
    <View style={styles.line} />
  );
};

const styles = StyleSheet.create({
  line: {
    backgroundColor: '#FFC400',
    margin:10,
    height:'3%',
    width :200,
   
  },
});

export default HorizontalLine;