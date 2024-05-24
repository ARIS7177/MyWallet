import React from "react";
import PropTypes from 'prop-types';
import { Text,TouchableOpacity ,StyleSheet} from "react-native";

const Button = ({title, onPress, style, textStyle}) => {
    

    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress} >
            <Text style={[styles.buttonText, textStyle]}>{title}</Text>
     </TouchableOpacity>
    );
};

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    buttonStyle: PropTypes.object,
    textStyle: PropTypes.object,
  };

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#FFC400',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
       
      },
      buttonText:{
        color:'white',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        alignSelf:'center'
        },
});

export default Button;