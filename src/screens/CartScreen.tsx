import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import EmptyListAnimation from '../components/EmptyListAnimation'
import PaymentFooter from '../components/PaymentFooter'
import CartItem from '../components/CartItem'

const CartScreen = ({navigation, route}: any) => {

  const CartList = useStore((state: any) => state.CartList)
  const cartPrice = useStore((state: any) => state.cartPrice)
  const incrementCartItemQuantity = useStore((state: any) => state.incrementCartItemQuantity)
  const decrementCartItemQuantity = useStore((state: any) => state.decrementCartItemQuantity)
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice)

  const tabBarHeight = useBottomTabBarHeight()

  const payButtonHandler = () => {
    navigation.push('Payment')
  }

  const incrementCartItemQuantityHandler = () => {}

  const decrementCartItemQuantityHandler = () => {}

  console.log(CartList.length)
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
        <View style={styles.ItemContainer}>
        <HeaderBar title='Cart' />
        {
          CartList.length == 0 
          ? <EmptyListAnimation title='Cart is Empty' /> 
          : <View style={styles.ListItemContainer}>
            {
              CartList.map((data: any) => (
                <TouchableOpacity onPress={() => {}}
                key={data.id}>
                  <CartItem
                  id={data.id} 
                  name={data.name} 
                  imagelink_square={data.imagelink_square} 
                  special_ingredient={data.special_ingredient} 
                  roasted={data.roasted} 
                  prices={data.prices} 
                  type={data.type} 
                  incrementCartItemQuantityHandler={incrementCartItemQuantityHandler} 
                  decrementCartItemQuantityHandler={decrementCartItemQuantityHandler} />
                </TouchableOpacity>
              ))
            }
          </View>
        }
        </View>
        {
          CartList.length != 0
          ? <PaymentFooter
          buttonTitle='Pay'
          price={{price: cartPrice, currency: '$'}}
          buttonPressHandler={payButtonHandler} />
          : <></>
        }
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
export default CartScreen