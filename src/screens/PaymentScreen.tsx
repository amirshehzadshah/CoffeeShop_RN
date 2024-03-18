import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import GradientBGIcon from '../components/GradientBGIcon'
import PaymentMethod from '../components/PaymentMethod'
import PaymentFooter from '../components/PaymentFooter'
import LinearGradient from 'react-native-linear-gradient'
import Customicon from '../components/Customicon'
import { useStore } from '../store/store'
import PopUpAnimation from '../components/PopUpAnimation'

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false
  }
]

const PaymentScreen = ({navigation, route}: any) => {
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice)
  const orderHstoryListFromCart = useStore((state: any) => state.orderHstoryListFromCart)
  const [paymentMode, setPaymentMode] = useState('Credit Card')
  const [showAnimation, setShowAnimation] = useState(false)

  const PayWithHandler = () => {
    setShowAnimation(true)
    orderHstoryListFromCart()
    calculateCartPrice()
    setTimeout(() => {
      setShowAnimation(false)
      navigation.navigate('OrderHistory')
    }, 2000);
  }
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      {
        showAnimation ? <PopUpAnimation style={styles.LottieAnimation} source={require('../lottie/successful.json')} /> : <></>
      }
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewflex}>
        <View style={styles.HeaderContainer}>
          <TouchableOpacity onPress={() => {navigation.pop()}}>
            <GradientBGIcon 
            name='left'
            color={COLORS.primaryLightGreyHex}
            size={FONTSIZE.size_16}/>
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payment</Text>
          <View style={styles.EmptyView} />
        </View>
        <View style={styles.PaymentOptionsContainer}>
          <TouchableOpacity onPress={() => { setPaymentMode('Credit Card')}}>
            <View style={[styles.CreditCardContainer, {
              borderColor: paymentMode == 'Credit Card' ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex
            }]}>
              <Text style={styles.CreditCardTitle}>Credit Card</Text>
              <View style={styles.CreditCardBG}>
                <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.LinearGradientStyle}>
                  <View style={styles.CreditCardRow}>
                    <Customicon name='chip' size={FONTSIZE.size_20 * 2} color={COLORS.primaryOrangeHex}/>
                    <Customicon name='visa' size={FONTSIZE.size_30 * 2} color={COLORS.primaryWhiteHex}/>
                  </View>
                  <View style={styles.CreditCardNumberContainer}>
                    <Text style={styles.CreditCardNumber}>4365</Text>
                    <Text style={styles.CreditCardNumber}>6743</Text>
                    <Text style={styles.CreditCardNumber}>9874</Text>
                    <Text style={styles.CreditCardNumber}>2378</Text>
                  </View>
                  <View style={styles.CreditCardRow}>
                    <View style={styles.CreditCardNameContainer}>
                      <Text style={styles.CreditCardNameSubtitle}>Card Holder</Text>
                      <Text style={styles.CreditCardNameTitle}>Robert Evans</Text>
                    </View>
                    <View style={styles.CreditCardDateContainer}>
                      <Text style={styles.CreditCardNameSubtitle}>Expriy Date</Text>
                      <Text style={styles.CreditCardNameTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {
            PaymentList.map((data: any) => (
              <TouchableOpacity
              key={data.name}
              onPress={() => {setPaymentMode(data.name)}}>
                <PaymentMethod paymentMode={paymentMode} name={data.name} icon={data.icon} isIcon={data.isIcon} />
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
      <PaymentFooter
      buttonTitle={`Pay with ${paymentMode}`} 
      price={{price: route.params.amount, currency: '$'}}
      buttonPressHandler={PayWithHandler}/>
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
  ScrollViewflex: {
    flexGrow: 1
  },
  HeaderContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  HeaderText :{
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex
  },
  EmptyView: {
    width: SPACING.space_36,
    height: SPACING.space_36
  },
  PaymentOptionsContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15
  },
  CreditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15,
    borderWidth: 3
  },
  CreditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft: SPACING.space_10
  },
  CreditCardBG: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_25
  },
  LinearGradientStyle: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10
  },
  CreditCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  CreditCardNumberContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center'
  },
  CreditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_4 + SPACING.space_2
  },
  CreditCardNameContainer: {
    alignItems: 'flex-start'
  },
  CreditCardDateContainer: {
    alignItems: 'flex-end'
  },
  CreditCardNameSubtitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryLightGreyHex,
  },
  CreditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  }
})
export default PaymentScreen