import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../config/colors';

function MusicListCard(props) {
  return (
    <View style={styles.container}>
      <View style={styles.image}></View>
      <View>
        <Text style={styles.primaryText}>Insomnia</Text>
        <Text style={styles.secondaryText}>Valetudo Beats 4:20</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    height: 60,
    width: 60,
    backgroundColor: colors.white,
    borderRadius: 30,
    marginRight: 15,
  },
  primaryText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryText: {
    color: colors.light,
    lineHeight: 24,
  },
});
export default MusicListCard;
