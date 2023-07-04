import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  TrackPlayerEvents,
  useTrackPlayerEvents,
  useTrackPlayerProgress,
} from 'react-native-track-player';
import Slider from '@brlja/react-native-slider';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';

import songs from '../data/songsData/songsData';
import Icon from '../components/Icon';
import colors from '../config/colors';
import PlayingMuicCard from '../components/PlayingMuicCard';

function PlayingMusicScreen(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [looping, setLooping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useProgress();
  const navigation = useNavigation();
  const ref = useRef();

  useEffect(() => {
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
  }, []);

  const setPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songs);
    // Enable loop capability
    // await TrackPlayer.updateOptions({
    //   capabilities: [
    //     Capability.Play,
    //     Capability.Pause,
    //     Capability.SkipToNext,
    //     Capability.SkipToPrevious,
    //     Capability.Stop,
    //     Capability.Seek,
    //     Capability.Loop,
    //   ],
    // });
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
    const currentPosition = await TrackPlayer.getPosition();
    if (currentPosition < 3) {
      await TrackPlayer.skipToPrevious();
    } else {
      await TrackPlayer.seekTo(0);
    }
  };

  const toggleLoop = async () => {
    const currentLooping = await TrackPlayer.getRepeatMode();
    await TrackPlayer.setRepeatMode(!currentLooping);
    setLooping(!currentLooping);
    console.log('looping');
  };
  const scrollToNextItem = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    ref.current.scrollToIndex({index: nextIndex, animated: true});
    setCurrentIndex(nextIndex);
    playNext();
  };

  const scrollToPreviousItem = () => {
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    ref.current.scrollToIndex({index: prevIndex, animated: true});
    setCurrentIndex(prevIndex);
    playPrevious();
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
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerText}>Playing Music</Text>
          <Icon />
        </View>
        <FlatList
          horizontal
          ref={ref}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={songs}
          // keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => <PlayingMuicCard item={item} />}
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
            iconColor={colors.grey}
            source={require('../assets/crossed-arrows.png')}
          />
          <View style={{transform: [{rotate: '180deg'}]}}>
            <Icon
              source={require('../assets/next-button.png')}
              IconSize={26}
              onPress={() => scrollToPreviousItem()}
            />
          </View>
          {isPlaying ? (
            <Icon
              iconColor={colors.dark}
              backgroundColor="white"
              source={require('../assets/pause.png')}
              IconSize={24}
              iconBackgroundSize={60}
              borderRadius={30}
              onPress={() => togglePlayback()}
            />
          ) : (
            <Icon
              iconColor={colors.dark}
              backgroundColor="white"
              source={require('../assets/play.png')}
              IconSize={20}
              iconBackgroundSize={60}
              borderRadius={30}
              onPress={() => togglePlayback()}
            />
          )}
          <Icon
            source={require('../assets/next-button.png')}
            IconSize={26}
            onPress={() => scrollToNextItem()}
          />
          <Icon
            iconColor={colors.grey}
            source={require('../assets/refresh.png')}
            onPress={() => toggleLoop()}
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
