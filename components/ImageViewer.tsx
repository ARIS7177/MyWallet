import { StyleSheet, Image, ImageSourcePropType } from 'react-native';

export default function ImageViewer({ PlaceholderImageSource }: {PlaceholderImageSource:ImageSourcePropType }) {
  return (
    <Image source={PlaceholderImageSource} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: '60%' ,
  },
});