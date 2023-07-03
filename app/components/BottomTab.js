import {useNavigation} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import colors from '../config/colors';
import Icon from './Icon';

function BottomTab(props) {
  const navigation = useNavigation();
  const [firstColor, setFirstColor] = useState(colors.white);
  const [secondColor, setSecondColor] = useState(colors.grey);
  const [thirdColor, setThirdColor] = useState(colors.grey);

  const changefirstColor = () => {
    setFirstColor(colors.white);
    setSecondColor(colors.grey);
    setThirdColor(colors.grey);
  };
  const changesecondColor = () => {
    setFirstColor(colors.grey);
    setSecondColor(colors.white);
    setThirdColor(colors.grey);
  };
  const changethirdColor = () => {
    setFirstColor(colors.grey);
    setSecondColor(colors.grey);
    setThirdColor(colors.white);
  };

  return (
    <BlurView
      blurAmount={0}
      style={{position: 'absolute', bottom: 0, right: 0, left: 0}}>
      <BlurView blurType="light" style={styles.container}>
        <Icon
          source={require('../assets/home.png')}
          onPress={() => {
            changefirstColor();
            navigation.navigate('Home');
          }}
          iconColor={firstColor}
        />
        <Icon
          source={require('../assets/musical.png')}
          onPress={() => {
            changesecondColor();
            navigation.navigate('Playing');
          }}
          iconColor={secondColor}
        />
        <Icon
          source={require('../assets/heart.png')}
          onPress={() => {
            changethirdColor();
            navigation.navigate('Liked');
          }}
          iconColor={thirdColor}
        />
      </BlurView>
    </BlurView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 30,
    paddingVertical: 5,
    marginHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.grey,
  },
});
export default BottomTab;
