import React, {useState} from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import Icon from './Icon';
import colors from '../config/colors';

function PlayingMuicCard({item}) {
  const [visible, setVisible] = useState();
  const [ids, setIds] = useState();

  const addId = () => {
    const array = [];
    array.push(item.id);
    setIds(array);
    console.log(array);
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={styles.ImageContainer}>
        <Image
          resizeMode="cover"
          style={styles.poster}
          source={{
            uri: item.poster,
          }}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.primaryText} numberOfLines={1}>
          {item.title}
        </Text>
        {visible ? (
          <Icon
            source={require('../assets/heart-filled.png')}
            IconSize={22}
            iconColor={'red'}
            onPress={() => {
              setVisible(false);
            }}
          />
        ) : (
          <Icon
            source={require('../assets/heart.png')}
            IconSize={22}
            onPress={() => {
              setVisible(true);
              addId();
            }}
          />
        )}
      </View>
      <Text style={styles.secondaryText}>{item.artist}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  ImageContainer: {
    overflow: 'hidden',
    alignSelf: 'center',
    width: screenWidth - 40,
    height: screenHeight / 2 - 80,
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    // shadowColor: colors.grey,
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
    // shadowOffset: {
    //   width: 5,
    //   height: 5,
    // },
  },
  poster: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  primaryText: {
    color: colors.light,
    fontSize: 26,
    letterSpacing: 1,
  },
  secondaryText: {
    color: colors.grey,
    fontSize: 18,
  },
});
export default PlayingMuicCard;
