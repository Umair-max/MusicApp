import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Icon from '../components/Icon';
import colors from '../config/colors';
import MusicCard from '../components/MusicCard';
import RecentMusicCard from '../components/RecentMusicCard';

import songs from '../data/songsData/songsData';
import {useNavigation} from '@react-navigation/native';

function HomeScreen(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.background}>
      <StatusBar barStyle={'light-content'} />
      <View style={[styles.backView, {left: -20}]}></View>
      <View
        style={[
          styles.backView,
          {right: -20, top: '30%', width: 300, height: 300, borderRadius: 150},
        ]}></View>
      <View style={[styles.backView, {left: -20, bottom: 0}]}></View>
      <BlurView style={styles.blur} blurType="dark" blurAmount={40}></BlurView>
      <SafeAreaView>
        <View style={{marginLeft: 20}}>
          <Icon
            source={require('../assets/search.png')}
            backgroundColor={colors.white}
            iconColor={colors.black}
          />
        </View>
        <Text style={styles.headerText}>Find your favorite music</Text>
        <View style={styles.textContainer}>
          <Text style={styles.primary}>Musics🔥</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('SeeAll', {item: songs})}>
            <Text style={styles.secondary}>View All</Text>
          </TouchableWithoutFeedback>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={songs}
          renderItem={({item}) => <MusicCard item={item} />}
        />
        <View style={styles.textContainer}>
          <Text style={styles.primary}>Recently Played</Text>
          <Text style={styles.secondary}>View All</Text>
        </View>
        <RecentMusicCard />
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
    backgroundColor: '#590696',
    borderRadius: 100,
    zIndex: -2,
  },
  headerText: {
    color: colors.light,
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 30,
  },
  primary: {
    color: colors.light,
    fontSize: 18,
    fontWeight: '500',
  },
  secondary: {
    color: colors.grey,
    fontSize: 16,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
export default HomeScreen;
