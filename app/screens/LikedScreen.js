import React from 'react';
import {View, StyleSheet, Text, SafeAreaView, StatusBar} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import colors from '../config/colors';
import Icon from '../components/Icon';
import MusicListCard from '../components/MusicListCard';

function LikedScreen(props) {
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
      <View style={styles.image}></View>
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
          />
          <Text style={styles.headerText}>Playing Music</Text>
          <Icon />
        </View>
        <View style={{height: 280}}></View>
        <MusicListCard />
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
    backgroundColor: colors.purple,
  },
  headerText: {
    color: colors.light,
    fontSize: 24,
    fontWeight: '500',
  },
});
export default LikedScreen;
