import React from 'react';
import {Image, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import colors from '../config/colors';

function Icon({
  onPress,
  source,
  IconSize = 20,
  backgroundColor = 'transparent',
  iconColor = colors.white,
  borderRadius = 7,
  iconBackgroundSize = 40,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          backgroundColor: backgroundColor,
          height: iconBackgroundSize,
          width: iconBackgroundSize,
          borderRadius: borderRadius,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={source}
          style={{width: IconSize, height: IconSize, tintColor: iconColor}}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({});
export default Icon;
