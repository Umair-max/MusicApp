import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import TrackPlayer, {State, useProgress} from 'react-native-track-player';
import Slider from '@brlja/react-native-slider';
import {BlurView} from '@react-native-community/blur';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import songs from '../data/songsData/songsData';
import Icon from '../components/Icon';
import colors from '../config/colors';
import PlayingMuicCard from '../components/PlayingMuicCard';

function PlayingMusicScreen(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [looping, setLooping] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useProgress();
  const navigation = useNavigation();
  const ref = useRef();
  const route = useRoute();
  const isfocused = useIsFocused();

  useEffect(() => {
    // if (isfocused) {
    setPlayer();

    const playbackStateListener = async songs => {
      if (songs.state === State.Playing) {
        setIsPlaying(true);
        console.log('playing');
      } else {
        setIsPlaying(false);
        console.log('notPlaying');
      }
    };

    TrackPlayer.addEventListener('playback-state', playbackStateListener);

    return () => {
      TrackPlayer.remove('playback-state', playbackStateListener);
    };
    // }
  }, []);

  useEffect(() => {
    try {
      if (isfocused) {
        if (route.params.index >= 0) {
          const {index} = route.params;
          console.log(index);
          ref.current?.scrollToIndex({index: index, animated: true});
          playMusic(index);
          console.log('up', index);
        }
      }
    } catch (e) {
      console.log('e >>>>>>>>>>', e);
    }
  }, [route.params, isfocused, props]);

  const setPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songs);
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const playNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const playPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const scrollToNextItem = () => {
    if (currentIndex <= songs.length - 2) {
      const nextIndex = currentIndex + 1;
      ref.current.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
      playNext();
    }
  };

  const scrollToPreviousItem = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      ref.current.scrollToIndex({index: prevIndex, animated: true});
      setCurrentIndex(prevIndex);
      playPrevious();
    }
  };

  const handleLoop = async () => {
    const currentLooping = await TrackPlayer.getRepeatMode();
    await TrackPlayer.setRepeatMode(!currentLooping);
    setLooping(!currentLooping);
    looping ? console.log('not loopong') : console.log('looping');
  };

  const settingUpShuffle = () => {
    if (!shuffle) {
      handleShuffle();
    } else if (shuffle) {
      handleCancelShuffle();
    }
  };

  const handleShuffle = async () => {
    let queue = await TrackPlayer.getQueue();
    await TrackPlayer.reset();
    queue.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(queue);
    setShuffle(true);
    console.log('shuffled');
  };

  handleCancelShuffle = async () => {
    TrackPlayer.reset();
    TrackPlayer.add(songs);
    setShuffle(false);
    console.log('removed shuffle');
  };

  const storeItem = async index => {
    try {
      const data = index;

      const placesString = await AsyncStorage.getItem('index');
      let places = [];

      if (placesString) {
        places = JSON.parse(placesString);
      }
      places.push(data);
      const updatedPlacesString = JSON.stringify(places);
      await AsyncStorage.setItem('index', updatedPlacesString);
      console.log('done');
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async index => {
    const storedLocations = await AsyncStorage.getItem('index');
    let updatedLocations = JSON.parse(storedLocations);

    updatedLocations.splice(index, 1);
    await AsyncStorage.setItem('index', JSON.stringify(updatedLocations));
  };

  const playMusic = async index => {
    const trackId = songs[index].id - 1;
    setCurrentIndex(trackId);

    await TrackPlayer.skip(trackId);
    await TrackPlayer.play();
  };

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
        <View style={styles.headerContainer}>
          <Icon
            source={require('../assets/back.png')}
            IconSize={17}
            backgroundColor={colors.white}
            iconColor={colors.black}
            onPress={() => {
              navigation.goBack();
              TrackPlayer.pause();
            }}
          />
          <Text style={styles.headerText}>Playing Music</Text>
          <Icon />
        </View>
        <FlatList
          scrollEnabled={false}
          horizontal
          ref={ref}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={songs}
          onScrollToIndexFailed={info => {
            console.log('Failed to scroll to index:', info.index);
            const wait = new Promise(resolve => setTimeout(resolve, 700));
            wait.then(() => {
              ref.current.scrollToIndex({
                index: info.index,
                animated: false,
              });
              console.log('down', info.index);
              playMusic(info.index);
            });
          }}
          renderItem={({item, index}) => (
            <PlayingMuicCard
              onUnpress={() => removeItem(index)}
              item={item}
              index={index}
              onPress={() => storeItem(index)}
            />
          )}
        />

        <Slider
          minimumValue={0}
          value={progress.position}
          maximumValue={progress.duration}
          minimumTrackTintColor={colors.orange}
          maximumTrackTintColor={colors.white}
          thumbTintColor={colors.white}
          onValueChange={async value => {
            await TrackPlayer.seekTo(value);
          }}
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.secondaryText}>
            {new Date(progress.position * 1000).toString().substring(19, 24)}
          </Text>
          <Text style={styles.secondaryText}>
            {new Date(progress.duration * 1000).toString().substring(19, 24)}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon
            iconColor={shuffle ? colors.dark : colors.grey}
            source={require('../assets/crossed-arrows.png')}
            onPress={() => settingUpShuffle()}
            borderRadius={20}
            backgroundColor={shuffle ? colors.white : null}
            iconBackgroundSize={30}
          />
          <View style={{transform: [{rotate: '180deg'}]}}>
            <Icon
              source={require('../assets/next-button.png')}
              IconSize={26}
              onPress={() => scrollToPreviousItem()}
            />
          </View>
          <Icon
            iconColor={colors.dark}
            backgroundColor="white"
            source={
              isPlaying
                ? require('../assets/pause.png')
                : require('../assets/play.png')
            }
            IconSize={isPlaying ? 24 : 20}
            iconBackgroundSize={60}
            borderRadius={30}
            onPress={() => togglePlayback()}
          />
          <Icon
            source={require('../assets/next-button.png')}
            IconSize={26}
            onPress={() => scrollToNextItem()}
          />
          <Icon
            iconColor={looping ? colors.dark : colors.grey}
            source={require('../assets/refresh.png')}
            onPress={() => handleLoop()}
            borderRadius={20}
            backgroundColor={looping ? colors.white : null}
            iconBackgroundSize={30}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 20,
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
  headerText: {
    color: colors.light,
    fontSize: 24,
    fontWeight: '500',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondaryText: {
    color: colors.grey,
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    alignItems: 'center',
  },
});
export default PlayingMusicScreen;
