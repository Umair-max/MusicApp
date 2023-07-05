import React from 'react';
import {Text, View, StyleSheet, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../config/colors';
import Icon from './Icon';

function MusicListCard({item, index, setData}) {
  const removeSong = async index => {
    const storedLocations = await AsyncStorage.getItem('index');
    let updatedLocations = JSON.parse(storedLocations);

    updatedLocations.splice(index, 1);
    await AsyncStorage.setItem('index', JSON.stringify(updatedLocations));
    setData(updatedLocations);
  };

  return (
    <View style={styles.container}>
      {item && (
        <View style={styles.image}>
          <Image source={{uri: item.poster}} style={{flex: 1}} />
        </View>
      )}
      <View>
        {item && <Text style={styles.primaryText}>{item.title}</Text>}
        {item && <Text style={styles.secondaryText}>{item.artist}</Text>}
      </View>
      <View style={{flex: 1}}></View>
      <Icon
        source={require('../assets/heart-filled.png')}
        iconColor={'red'}
        onPress={() => {
          Alert.alert('warning', 'do you want to unlike this song', [
            {text: 'No', onPress: () => null},
            {text: 'Yes', onPress: () => removeSong(index)},
          ]);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    height: 60,
    width: 60,
    backgroundColor: colors.white,
    borderRadius: 30,
    marginRight: 15,
    overflow: 'hidden',
  },
  primaryText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryText: {
    color: colors.light,
    lineHeight: 24,
  },
});
export default MusicListCard;
