import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  ViewComponent,
  Dimensions,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Slider from 'react-native-slider';
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
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import songs from '../data/songsData/songsData';
import Icon from '../components/Icon';
import colors from '../config/colors';
import {useNavigation} from '@react-navigation/native';

function PlayingMusicScreen(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const ref = useRef();

  // useEffect(() => {
  // setupPlayer();

  // const listeners = [
  //   useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], event => {
  //     if (event.state === State.Playing) {
  //       setIsPlaying(true);
  //     } else {
  //       setIsPlaying(false);
  //     }
  //   }),
  // ];
  // return () => {
  //   listeners.forEach(listener => listener.remove()); // Clean up the event listeners when the component unmounts
  // };

  // const listener = TrackPlayer.addEventListener(
  //   'playback-state',
  //   ({state}) => {
  //     if (state === State.Playing) {
  //       setIsPlaying(true);
  //     } else {
  //       setIsPlaying(false);
  //     }
  //   },
  // );
  // return () => {
  //   listener.remove();
  // };
  // }, []);

  useEffect(() => {
    setupPlayer();

    const playbackStateListener = async data => {
      if (data.state === State.Playing) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    };

    // Subscribe to the playback state event
    TrackPlayer.addEventListener('playback-state', playbackStateListener);

    // Clean up the event listener when the component unmounts
    return () => {
      TrackPlayer.removeEventListener('playback-state', playbackStateListener);
    };
  }, []);

  const setupPlayer = async () => {
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
    const currentPosition = await TrackPlayer.getPosition();
    if (currentPosition < 3) {
      await TrackPlayer.skipToPrevious();
    } else {
      await TrackPlayer.seekTo(0);
    }
  };

  const scrollToNextItem = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    ref.current.scrollToIndex({index: nextIndex, animated: true});
    setCurrentIndex(nextIndex);
  };

  const scrollToPreviousItem = () => {
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    ref.current.scrollToIndex({index: prevIndex, animated: true});
    setCurrentIndex(prevIndex);
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.primaryText} numberOfLines={1}>
                  {item.title}
                </Text>
                <Icon source={require('../assets/heart.png')} IconSize={22} />
              </View>
              <Text style={styles.secondaryText}>{item.artist}</Text>
            </View>
          )}
        />

        <Slider
          minimumTrackTintColor={colors.orange}
          thumbTintColor={colors.white}
          maximumTrackTintColor={colors.light}
          onSlidingComplete={() => {}}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.secondaryText}>3:20</Text>
          <Text style={styles.secondaryText}>4:20</Text>
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
              onPress={() => {
                playPrevious();
                scrollToPreviousItem();
              }}
            />
          </View>
          <Icon
            iconColor={colors.dark}
            backgroundColor="white"
            source={require('../assets/play.png')}
            IconSize={20}
            iconBackgroundSize={60}
            borderRadius={30}
            onPress={() => togglePlayback()}
          />
          <Icon
            source={require('../assets/next-button.png')}
            IconSize={26}
            onPress={() => {
              playNext();
              scrollToNextItem();
            }}
          />
          <Icon
            iconColor={colors.grey}
            source={require('../assets/refresh.png')}
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
  ImageContainer: {
    overflow: 'hidden',
    alignSelf: 'center',
    width: screenWidth - 40,
    height: screenHeight / 2 - 80,
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    // shadowColor: '#ccc',
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
    // shadowOffset: {
    //   width: 5,
    //   height: 5,
    // },
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    alignItems: 'center',
  },
  poster: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
});
export default PlayingMusicScreen;
