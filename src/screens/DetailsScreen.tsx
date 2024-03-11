import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { COLORS } from '../theme/theme'
import ImageBackGroundInfo from '../components/ImageBackGroundInfo'

const DetailsScreen = ({ navigation, route }: any) => {
  const ItemOfIndex = useStore((state: any) => route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList)[route.params.index]
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList)
  const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList)

  const BackHandler = () => {
    navigation.pop();
  }

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id)
  }

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
        <ImageBackGroundInfo
        EnableBackHandler={true}
        id={ItemOfIndex.id}
        name={ItemOfIndex.name}
        roasted={ItemOfIndex.roasted}
        imagelink_portrait={ItemOfIndex.imagelink_portrait}
        ingredients={ItemOfIndex.ingredients}
        special_ingredient={ItemOfIndex.special_ingredient}
        average_rating={ItemOfIndex.average_rating}
        ratings_count={ItemOfIndex.ratings_count}
        favourite={ItemOfIndex.favourite}
        type={ItemOfIndex.type}
        BackHandler={BackHandler}
        ToggleFavourite={ToggleFavourite} />
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex: {}
})
export default DetailsScreen