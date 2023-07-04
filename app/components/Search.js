import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TextInput, FlatList, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Icon from './Icon';
import colors from '../config/colors';
import songs from '../data/songsData/songsData';
import {useNavigation} from '@react-navigation/native';

function Search(props) {
  const navigation = useNavigation();
  const searchRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMasterDataSource(songs);
    setFilteredDataSource(songs);
  }, []);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setInputText(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setInputText(text);
    }
  };

  const handleSearchIconPress = () => {
    setSearchVisible(!searchVisible);
    if (!searchVisible) {
      searchRef.current?.fadeInLeft(500);
    } else {
      searchRef.current?.fadeOutRight(500);
    }
  };
  return (
    <>
      <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
        <Icon
          source={require('../assets/search.png')}
          backgroundColor={colors.white}
          iconColor={colors.black}
          onPress={() => handleSearchIconPress()}
        />
        <Animatable.View
          key={searchVisible ? 'visible' : 'hidden'}
          animation="fadeInLeftBig"
          duration={500}
          style={searchVisible ? styles.searchBar : styles.hiddenSearchBar}>
          <TextInput
            value={inputText}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Search"
            style={styles.textInput}
            onChangeText={text => {
              searchFilterFunction(text);
              text.length > 0 ? setVisible(true) : setVisible(false);
            }}
          />
        </Animatable.View>
      </View>
      {visible && (
        <View style={{height: 50, marginTop: 10}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredDataSource}
            renderItem={({item}) => (
              <Text
                style={styles.moviesTitle}
                onPress={() => {
                  navigation.navigate('Playing', {item: item});
                  searchFilterFunction(null);
                  setVisible(false);
                }}>
                {item.title}
              </Text>
            )}
          />
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  searchBar: {
    width: '90%',
    height: 40,
    marginLeft: -5,
    borderBottomRightRadius: 7,
    borderTopRightRadius: 7,
    backgroundColor: colors.white,
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    top: 0,
    zIndex: -1,
  },
  hiddenSearchBar: {
    width: 0,
    height: 0,
  },
  textInput: {
    paddingLeft: 10,
    width: '90%',
    fontSize: 16,
  },
  moviesTitle: {
    color: colors.white,
    marginLeft: 60,
  },
});
export default Search;
