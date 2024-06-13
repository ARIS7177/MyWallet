import Listedepense from '@/mesPages/Listedepense';
import Revenues from '@/mesPages/Revenues';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const PageSwitcher = ({page}) => {
  const [selectedPage, setSelectedPage] = useState(1);


    let content;
    switch (page) {
        case "1":
          content=<Listedepense/>
          break
        case "2":
          content=<Revenues/>
          break
        
        default:
            content='content not found'
          break;
  };

  

  return (
   <View>{content}</View>
  );
};


const styles = StyleSheet.create({
  
  
});

export default PageSwitcher;