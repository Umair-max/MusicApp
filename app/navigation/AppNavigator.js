import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import PlayingMusicScreen from '../screens/PlayingMusicScreen';
import LikedScreen from '../screens/LikedScreen';
import {useNavigation} from '@react-navigation/native';
import BottomTab from '../components/BottomTab';
import SeeAllScreen from '../screens/SeeAllScreen';

function AppNavigator(props) {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      tabBar={() => <BottomTab />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen name={'Home'} component={HomeScreen} />
      <Tab.Screen name={'Playing'} component={PlayingMusicScreen} />
      <Tab.Screen name={'Liked'} component={LikedScreen} />
      <Tab.Screen name={'SeeAll'} component={SeeAllScreen} />
    </Tab.Navigator>
  );
}

export default AppNavigator;
