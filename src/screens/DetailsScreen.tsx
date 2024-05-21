import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import ImageBackGroundInfo from '../components/ImageBackGroundInfo'
import PaymentFooter from '../components/PaymentFooter'

const DetailsScreen = ({ navigation, route }: any) => {

  // console.log("🕵️‍♂️ > file: DetailsScreen.tsx:10 > DetailsScreen > route: ", route);

  const ItemOfIndex = useStore((state: any) => route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList)[route.params.index]

  // console.log("🕵️‍♂️ > file: DetailsScreen.tsx:14 > DetailsScreen > ItemOfIndex: ", ItemOfIndex.name);

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList)
  const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList)
  const addToCart = useStore((state: any) => state.addToCart)
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice)

  const [price, setPrice] = useState(ItemOfIndex.prices[0])
  const [fullDescription, setFullDescription] = useState(false)

  const BackHandler = () => {
    navigation.pop();
  }

  const ToggleFavourite = (favourite: boolean, pid:string, type: string, id: string) => {

    // console.log("🕵️‍♂️ > file: DetailsScreen.tsx:35 > ToggleFavourite > pid: ", pid);

    favourite ? deleteFromFavoriteList(pid, type, id) : addToFavoriteList(pid, type, id)
  }

  const addToCartHandler = ({
    id, name, roasted, imagelink_square, special_ingredient, price, type, index
  }: any) => {
    addToCart({
      id, name, roasted, imagelink_square, special_ingredient, prices: [{...price, quantity: 1}], type, index
    })
    calculateCartPrice()
    navigation.navigate('Cart')
  }

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar translucent backgroundColor="transparent" />
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
        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {
            fullDescription ? (
              <TouchableWithoutFeedback onPress={() => { setFullDescription(prev => !prev) }}>
                <Text style={styles.DescriptionText}>{ItemOfIndex.description}</Text>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={() => { setFullDescription(prev => !prev) }}>
                <Text style={styles.DescriptionText} numberOfLines={3}>{ItemOfIndex.description}</Text>
              </TouchableWithoutFeedback>
            )
          }
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {
              ItemOfIndex.prices.map((data: any) => (
                <TouchableOpacity
                  key={data.size}
                  onPress={() => { setPrice(data) }}
                  style={[styles.SizeBox, {
                    borderColor: data.size == price.size ? COLORS.primaryOrangeHex : COLORS.primaryDarkGreyHex
                  }]} >
                  <Text style={[styles.SizeText, {
                    fontSize: ItemOfIndex.type == 'bean' ? FONTSIZE.size_14 : FONTSIZE.size_16,
                    color: data.size == price.size ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex
                  }]}>{data.size}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
        <PaymentFooter
        price={price}
        buttonTitle='Add to Cart'
        buttonPressHandler={() => {
          addToCartHandler({
            id: ItemOfIndex.id,
            name: ItemOfIndex.name,
            roasted: ItemOfIndex.roasted,
            imagelink_square: ItemOfIndex.imagelink_square,
            special_ingredient: ItemOfIndex.special_ingredient,
            price: price,
            type: ItemOfIndex.type,
            index: ItemOfIndex.index
          })
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
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  FooterInfoArea: {
    padding: SPACING.space_20
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
    textAlign: 'justify'
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium
  }
})
export default DetailsScreen