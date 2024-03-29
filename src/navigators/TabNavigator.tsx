import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrderHistroyScreen from '../screens/OrderHistroyScreen';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';
import { BlurView } from '@react-native-community/blur';
import Customicon from '../components/Customicon';
import { Badge } from 'react-native-paper';
import { useStore } from '../store/store';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const CartList = useStore((state: any) => state.CartList)
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarBackground: () => (
                    <BlurView overlayColor='' blurAmount={15} style={styles.BlurViewStyles} />
                ),
            }}>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Customicon name='home' size={25} color={
                        focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                    } />
                )
            }} />
            <Tab.Screen name='Cart' component={CartScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            CartList.length > 0 ?
                                <>
                                    <Customicon name='cart' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                                    <Badge style={styles.CartBadge}>{CartList.length}</Badge>
                                </>
                                :
                                <Customicon name='cart' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />

                        }
                    </View>
                )
            }} />
            <Tab.Screen name='Favourite' component={FavoritesScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Customicon name='like' size={25} color={
                        focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                    } />
                )
            }} />
            <Tab.Screen name='OrderHistory' component={OrderHistroyScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Customicon name='bell' size={25} color={
                        focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                    } />
                )
            }} />
        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: 'absolute',
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent'
    },
    BlurViewStyles: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    CartBadge: {
        backgroundColor: COLORS.primaryOrangeHex,
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        position: 'absolute',
        top: -8,
        bottom: 0,
        left: 15,
        right: 0

    }
})
export default TabNavigator