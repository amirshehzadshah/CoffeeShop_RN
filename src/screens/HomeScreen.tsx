import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
  catagories.unshift('All')
  return catagories;
}

const getCoffeeList = (catagory: string, data: any) => {
  // console.log("🕵️‍♂️ > file: HomeScreen.tsx:31 > getCoffeeList > catagory: ", catagory);
  // console.log("🕵️‍♂️ > file: HomeScreen.tsx:32 > getCoffeeList > data: ", data);
  if (catagory == 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name == catagory)
    return coffeeList;
  }
}

const HomeScreen = ({ navigation }: any) => {

  const getData = useStore((state: any) => state.getData)
  const CoffeeList = useStore((state: any) => state.CoffeeList)
  // console.log("🕵️‍♂️ > file: HomeScreen.tsx:49 > HomeScreen > CoffeeList: ", CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList)

  // // Loop through each item in BeanList
  // BeanList.forEach((beanItem: any) => {
  //   // Access the prices array of each item
  //   const prices = beanItem.imagelink_square;
  //   // Now you can use the prices array as needed
  //   // console.log(prices);
  // });

  const addToCart = useStore((state: any) => state.addToCart)
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice)


  // const catagories = getCategoriesFromData(CoffeeList)
  const [catagories, setCatagories] = useState<string[]>([])
  const [searchText, setSearchText] = useState('')
  const [catagoryIndex, setCatagoryIndex] = useState({
    index: 0,
    catagory: catagories[0]
  })
  // console.log("🕵️‍♂️ > file: HomeScreen.tsx:77 > HomeScreen > catagoryIndex: ", catagoryIndex);

  // const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(catagoryIndex.catagory, CoffeeList))
  const [sortedCoffee, setSortedCoffee] = useState<any[]>([]);

  // console.log("🕵️‍♂️ > file: HomeScreen.tsx:69 > HomeScreen > sortedCoffee: ", sortedCoffee);
  // console.log("🕵️‍♂️ > file: HomeScreen.tsx:69 > HomeScreen > sortedCoffee: ", sortedCoffee.map((item) => item.id));

  const tabBarHeight = useBottomTabBarHeight();
  const ListRef: any = useRef<FlatList>();

  const searchCoffee = (search: string) => {
    if (search != '') {
      ListRef.current.scrollToOffset({


        animated: true,
        offset: 0
      })
      setCatagoryIndex({ index: 0, catagory: catagories[0] })
      setSortedCoffee([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()))
      ])
    }
  }

  const resetSearchCoffee = () => {
    ListRef.current.scrollToOffset({
      animated: true,
      offset: 0
    })
    setCatagoryIndex({ index: 0, catagory: catagories[0] })
    setSortedCoffee([
      ...CoffeeList
    ])
    setSearchText('')
  }

  const CardAddToCartHandler = ({
    id, name, roasted, imagelink_square, special_ingredient, prices, type, index
  }: any) => {
    addToCart({
      id, name, roasted, imagelink_square, special_ingredient, prices, type, index
    })
    calculateCartPrice()
    ToastAndroid.showWithGravity(`${name} is Add to Cart`, ToastAndroid.SHORT, ToastAndroid.CENTER)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const initialCategories = getCategoriesFromData(CoffeeList);
    setCatagories(initialCategories);
    setCatagoryIndex({ index: 0, catagory: catagories[0] })
  }, [CoffeeList]); // Only run when CoffeeList changes

  useEffect(() => {
    setSortedCoffee(getCoffeeList(catagoryIndex.catagory, CoffeeList));
  }, [catagoryIndex]);


  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        <HeaderBar title={''} />
        <Text style={styles.ScreenText}>Find the best{'\n'}coffee for you</Text>
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => {
            searchCoffee(searchText)
          }} >
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
            onChangeText={text => {
              setSearchText(text)
              searchCoffee(text)
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer} />
          {
            searchText.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  resetSearchCoffee()
                }}>
                <Customicon
                  name='close'
                  size={FONTSIZE.size_16}
                  color={COLORS.primaryLightGreyHex}
                  style={styles.InputIcon} />
              </TouchableOpacity>
            ) : <></>
          }
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
                    ListRef.current.scrollToOffset({
                      animated: true,
                      offset: 0
                    })
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
        {sortedCoffee == undefined && <View style={styles.EmptyListContainer}>
          <Text style={styles.CatagoryText} >Loading . . .</Text>
        </View>}
        {sortedCoffee && (
          <FlatList
            ref={ListRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.EmptyListContainer}>
                <Text style={styles.CatagoryText} >No Coffee Available</Text>
              </View>
            }
            data={sortedCoffee}
            contentContainerStyle={styles.FlatListContainer}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => {
                  navigation.push('Details', {
                    index: item.index,
                    id: item.id,
                    type: item.type
                  })
                }}>
                  <CoffeeCard
                    id={item.id}
                    name={item.name}
                    imagelink_square={item.imagelink_square}
                    special_ingredient={item.special_ingredient}
                    price={item.prices[2]}
                    average_rating={item.average_rating}
                    type={item.type}
                    roasted={item.roasted}
                    index={item.index}
                    buttonPressHandler={CardAddToCartHandler} />
                </TouchableOpacity>
              )
            }} />
        )}
        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[styles.FlatListContainer, { marginBottom: tabBarHeight }]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => {
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type
                })
              }}>
                <CoffeeCard
                  id={item.id}
                  name={item.name}
                  imagelink_square={item.imagelink_square}
                  special_ingredient={item.special_ingredient}
                  price={item.prices[2]}
                  average_rating={item.average_rating}
                  type={item.type}
                  roasted={item.roasted}
                  index={item.index}
                  buttonPressHandler={CardAddToCartHandler} />
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
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_20 * 5.88
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex
  }
})
export default HomeScreen