import { Text, View, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

export class CustomHeader extends Component {
  render() {
    return (
      <View className="containers flex-row justify-between items-center bg-yellow-50  w-full  py-2 z-0 px-2">
        <View className="images">
          <Image
            className=" "
            source={require("../assets/images/text logo.png")}
          />
        </View>
        <View className="buttons flex-row items-center gap-3">
          <TouchableOpacity>
            <Icon name="notifications-on" size={32} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="account-circle" size={32} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CustomHeader;
