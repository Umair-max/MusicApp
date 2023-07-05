import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BlurView} from '@react-native-community/blur';
import {useIsFocused} from '@react-navigation/native';

import colors from '../config/colors';
import Icon from '../components/Icon';
import MusicListCard from '../components/MusicListCard';
import songs from '../data/songsData/songsData';
import {useNavigation} from '@react-navigation/native';

function LikedScreen(props) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isfocused = useIsFocused();

  useEffect(() => {
    console.log('called');
    if (isfocused) {
      getData();
    }
  }, [props, isfocused]);

  const getData = async () => {
    try {
      const placesString = await AsyncStorage.getItem('index');
      const array = [];

      if (placesString) {
        const places = JSON.parse(placesString);
        console.log(places);
        for (let index of places) {
          const songData = songs[index];
          array.push(songData);
        }
        setData(array);
      } else {
        console.log('No places found.');
      }
    } catch (error) {
      console.log('Error while retrieving places:', error);
    }
  };
  return (
    <View style={styles.background}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={[
          styles.backView,
          {right: -20, top: '30%', width: 300, height: 300, borderRadius: 150},
        ]}></View>
      <View style={[styles.backView, {left: -20, bottom: 0}]}></View>
      <BlurView style={styles.blur} blurType="dark" blurAmount={40}></BlurView>
      <View style={styles.image}>
        {data[0] && <Image source={{uri: data[0].poster}} style={{flex: 1}} />}
      </View>
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Icon
            backgroundColor={colors.white}
            source={require('../assets/back.png')}
            iconColor={colors.black}
            IconSize={17}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerText}>Playing Music</Text>
          <Icon />
        </View>
        <View style={{height: 280}}></View>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <MusicListCard item={item} index={index} setData={setData} />
          )}
        />
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background,
    flex: 1,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  backView: {
    width: 200,
    height: 200,
    position: 'absolute',
    backgroundColor: colors.purple,
    borderRadius: 100,
    zIndex: -2,
  },
  image: {
    position: 'absolute',
    height: 340,
    width: '100%',
    backgroundColor: 'transparent',
  },
  headerText: {
    color: colors.light,
    fontSize: 24,
    fontWeight: '500',
  },
});
export default LikedScreen;
