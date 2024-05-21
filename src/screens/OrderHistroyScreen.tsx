import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { COLORS, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import EmptyListAnimation from '../components/EmptyListAnimation'
import PopUpAnimation from '../components/PopUpAnimation'
import OrderHistoryCard from '../components/OrderHistoryCard'

const OrderHistroyScreen = ({ navigation }: any) => {
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList)
  // console.log("🕵️‍♂️ > file: OrderHistroyScreen.tsx:8 > OrderHistroyScreen > OrderHistoryList: ", OrderHistoryList);
  const [showAnimation, setShowAnimation] = useState(false)
  const tabBarHeight = useBottomTabBarHeight();

  const navigationHandler = ({index, id, type}: any) => {
    navigation.push('Details', {
      index: index,
      id: id,
      type: type
    })
  }
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {
        showAnimation ? <PopUpAnimation style={styles.LottieAnimation} source={require('../lottie/successful.json')} /> : <></>
      }
      <ScrollView showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title='Order History' navigation={navigation} navigatePath='Menu' />
            {
              OrderHistoryList.length == 0
                ? <EmptyListAnimation title='No Order History' />
                : <View style={styles.ListItemContainer}>
                  {
                    OrderHistoryList?.map((data: any, index: any) => (
                      <OrderHistoryCard
                      key={index.toString()}
                      navigationHandler={navigationHandler}
                      CartList={data.CartList}
                      CartListPrice={data.cartListPrice}
                      OrderDate={data.orderDate} />
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
  LottieAnimation: {
    flex: 1
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
export default OrderHistroyScreen