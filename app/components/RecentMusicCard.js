import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../config/colors';

function RecentMusicCard(props) {
  return <View style={styles.container}></View>;
}
const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 130,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginHorizontal: 20,
  },
});
export default RecentMusicCard;
