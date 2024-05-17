import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { COLORS, SPACING } from '../theme/theme'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import HeaderBar from '../components/HeaderBar'
import EmptyListAnimation from '../components/EmptyListAnimation'
import FavoritesItemCard from '../components/FavoritesItemCard'

const FavoritesScreen = ({ navigation }: any) => {
  const FavoritesList = useStore((state: any) => state.FavoritesList)

  console.log("🕵️‍♂️ > file: FavoritesScreen.tsx:13 > FavoritesScreen > FavoritesList: ", FavoritesList);

  const addToFavouriteList = useStore((state: any) => state.addToFavouriteList)
  const deleteFromFavouriteList = useStore((state: any) => state.deleteFromFavouriteList)

  const tabBarHeight = useBottomTabBarHeight()

  const ToggleFavourite = (favourite: boolean, pid:string, type: string, id: string) => {
    // console.log("🕵️‍♂️ > file: FavoritesScreen.tsx:21 > ToggleFavourite > ToggleFavourite: ", index);
    // console.log("🕵️‍♂️ > file: FavoritesScreen.tsx:21 > ToggleFavourite > ToggleFavourite: ", type);
    // console.log("🕵️‍♂️ > file: FavoritesScreen.tsx:21 > ToggleFavourite > ToggleFavourite: ", id);
    favourite ? deleteFromFavouriteList(pid, type, id) : addToFavouriteList(pid, type, id)
  }
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title='Favourites'navigation={navigation} navigatePath='Menu' />
            {
              FavoritesList?.length == 0
                ? <EmptyListAnimation title='No Favourites' />
                : <View style={styles.ListItemContainer}>
                  {
                    FavoritesList?.map((data: any) => (
                      <TouchableOpacity onPress={() => {
                        navigation.push('Details', {
                          index: data.index,
                          id: data.id,
                          type: data.type
                        })
                      }}
                        key={data.id}>
                        <FavoritesItemCard
                          id={data.id}
                          name={data.name}
                          imagelink_portrait={data.imagelink_portrait}
                          ingredients={data.ingredients}
                          special_ingredient={data.special_ingredient}
                          average_rating={data.average_rating}
                          ratings_count={data.ratings_count}
                          roasted={data.roasted}
                          description={data.description}
                          favourite={data.favourite}
                          type={data.type}
                          ToggleFavouriteItem={ToggleFavourite} />
                      </TouchableOpacity>
                    ))
                  }
                </View>
            }
          </View>
        </View>
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
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between'
  },
  ItemContainer: {
    flex: 1
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_16,
    gap: SPACING.space_20
  }
})
export default FavoritesScreen