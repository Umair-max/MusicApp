import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

import colors from '../config/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from '../components/Icon';

function SeeAllScreen(props) {
  const route = useRoute();
  const navigation = useNavigation();
  const data = route.params.item;

  return (
    <View style={styles.background}>
      <View style={[styles.backView, {left: -20}]}></View>
      <View
        style={[
          styles.backView,
          {right: -20, top: '30%', width: 300, height: 300, borderRadius: 150},
        ]}></View>
      <View style={[styles.backView, {left: -20, bottom: 0}]}></View>
      <BlurView style={styles.blur} blurType="dark" blurAmount={40}></BlurView>
      <SafeAreaView style={{paddingHorizontal: 20}}>
        <Icon
          source={require('../assets/back.png')}
          onPress={() => navigation.goBack()}
          backgroundColor={colors.white}
          iconColor={colors.black}
          IconSize={17}
        />
        <View style={{height: '90%', marginTop: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
            data={data}
            renderItem={({item}) => (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Playing')}>
                <View style={styles.container}>
                  <Image
                    source={{uri: item.poster}}
                    style={styles.poster}
                    resizeMode="stretch"
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
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
  container: {
    height: 250,
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  poster: {
    height: '100%',
    width: '100%',
  },
});
export default SeeAllScreen;
