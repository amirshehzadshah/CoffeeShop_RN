import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { StatusBar } from 'react-native';
import HeaderBar from '../components/HeaderBar';

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
  const [searchText, setSearchText] = useState([undefined])
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
  }
})
export default HomeScreen