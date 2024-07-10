import { StyleSheet, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const ImageViewer = ({
  placeholderImageSource,
  selectedImage,
}: {
  placeholderImageSource: any;
  selectedImage: string;
}) => {
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 990,
    objectFit: "cover",
    //backgroundColor:'yellow',
    marginLeft: 32,
    borderWidth: 2,
    borderColor: "#F6F5FD",
  },
});

export default ImageViewer;
