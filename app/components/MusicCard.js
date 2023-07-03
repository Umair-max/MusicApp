import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import colors from '../config/colors';

function MusicCard({item}) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Playing')}>
      <View style={styles.container}>
        <Image source={{uri: item.poster}} style={styles.image} />
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 280,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
export default MusicCard;
