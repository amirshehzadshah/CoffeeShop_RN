import { FlatList, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { StatusBar } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Customicon from '../components/Customicon';
import CoffeeCard from '../components/CoffeeCard';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let catagories = Object.keys(temp);
  catagories.unshift('All');
  return catagories;
}

const getCoffeeList = (catagory: string, data: any) => {
  if (catagory == 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name == catagory)
    return coffeeList;
  }
}

const HomeScreen = () => {

  const CoffeeList = useStore((state: any) => state.CoffeeList)
  const BeanList = useStore((state: any) => state.BeanList)
  const [catagories, setCatagories] = useState(getCategoriesFromData(CoffeeList))
  const [searchText, setSearchText] = useState('')
  const [catagoryIndex, setCatagoryIndex] = useState({
    index: 0,
    catagory: catagories[0]
  })
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(catagoryIndex.catagory, CoffeeList))
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        <HeaderBar title={'Home Screen'} />
        <Text style={styles.ScreenText}>Find the best{'\n'}coffee for you</Text>
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => { }} >
            <Customicon
              name='search'
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
              style={styles.InputIcon} />
          </TouchableOpacity>
          <TextInput
            placeholder='Find Your Coffee...'
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer} />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.CatagoryScrollViewStyle}>
          {
            catagories.map((data, index) => (
              <View
                key={index.toString()}
                style={styles.CatagoryScrollViewContainer}>
                <TouchableOpacity
                  style={styles.CatagoryScrollViewItem}
                  onPress={() => {
                    setCatagoryIndex({ index: index, catagory: catagories[index] })
                    setSortedCoffee([
                      ...getCoffeeList(catagories[index], CoffeeList)
                    ])
                  }}>
                  <Text style={[styles.CatagoryText, catagoryIndex.index == index ? {
                    color: COLORS.primaryOrangeHex
                  } : {}]}>
                    {data}
                  </Text>
                  {catagoryIndex.index == index ? <View style={styles.ActiveCatagory} /> : <></>}
                </TouchableOpacity>
              </View>
            ))
          }
        </ScrollView>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <CoffeeCard
                  id={item.id}
                  name={item.name}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  price={item.prices[2]}
                  average_rating={item.average_rating}
                  favourite={item.favourite}
                  type={item.type}
                  index={item.index}
                  buttonPressHandler={() => { }} />
              </TouchableOpacity>
            )
          }} />
        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={[styles.FlatListContainer, {marginBottom: tabBarHeight}]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity>
                <CoffeeCard
                  id={item.id}
                  name={item.name}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  price={item.prices[2]}
                  average_rating={item.average_rating}
                  favourite={item.favourite}
                  type={item.type}
                  index={item.index}
                  buttonPressHandler={() => { }} />
              </TouchableOpacity>
            )
          }} />
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex: {
    flexGrow: 1
  },
  ScreenText: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center'
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex
  },
  CatagoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20
  },
  CatagoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15
  },
  CatagoryScrollViewItem: {
    alignItems: 'center'
  },
  CatagoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4
  },
  ActiveCatagory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryLightGreyHex
  }
})
export default HomeScreen