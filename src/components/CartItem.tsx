import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import Customicon from './Customicon'

interface CartItemProps {
    id: string
    name: string
    imagelink_square: string
    special_ingredient: string
    roasted: string
    prices: any
    type: string
    incrementCartItemQuantityHandler: any
    decrementCartItemQuantityHandler: any
}

const CartItem: React.FC<CartItemProps> = ({id, name, imagelink_square, special_ingredient, roasted, prices, type, incrementCartItemQuantityHandler, decrementCartItemQuantityHandler}) => {
    console.log('ID Product : ', id)
    return (
        <View>
            {
                prices.length != 1
                    ? <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                        style={styles.CartItemLinearGradient}>
                        <View style={styles.CartItemRow}>
                            <Image source={{uri: imagelink_square}} style={styles.CartItemImage} />
                            <View style={styles.CartItemInfo}>
                                <View>
                                    <Text style={styles.CartItemTitle}>{name}</Text>
                                    <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
                                </View>
                                <View style={styles.CartItemRoastedContainer}>
                                    <Text style={styles.CartItemRoastedText}>{roasted}</Text>
                                </View>
                            </View>
                        </View>
                        {
                            prices.map((data: any, index: any) => (
                                <View key={index} style={styles.CartItemRowConatiner}>
                                    <View style={styles.CartItemSizeValueContainer}>
                                        <View style={styles.SizeBox}>
                                            <Text style={[styles.SizeText, {
                                                fontSize: type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16
                                            }]}>{data.size}</Text>
                                        </View>
                                        <Text style={styles.SizeCurrency}>{data.currency + ' '}<Text style={styles.SizePrice}>{data.price}</Text></Text>
                                    </View>
                                    <View style={styles.CartItemSizeValueContainer}>
                                        <TouchableOpacity
                                            onPress={() => decrementCartItemQuantityHandler(id, data.size)}
                                            style={styles.CartItemIcon}>
                                            <Customicon name='minus' size={FONTSIZE.size_10} color={COLORS.primaryWhiteHex} />
                                        </TouchableOpacity>
                                        <View style={styles.CartItemQuantityContainer}>
                                            <Text style={styles.CartItemQuantityText}>{data.quantity}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => incrementCartItemQuantityHandler(id, data.size)}
                                            style={styles.CartItemIcon}>
                                            <Customicon name='add' size={FONTSIZE.size_10} color={COLORS.primaryWhiteHex} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        }
                    </LinearGradient>
                    : <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                        style={styles.CartItemSingleLinearGradient}>
                        <View style={styles.CartItemRow}>
                            <Image source={{uri: imagelink_square}} style={styles.CartItemSingleImage} />
                            <View style={styles.CartItemSingleInfo}>
                                <View>
                                    <Text style={styles.CartItemTitle}>{name}</Text>
                                    <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
                                </View>
                                <View style={styles.CartItemSingleSizeValueContainer}>
                                        <View style={styles.SizeBox}>
                                            <Text style={[styles.SizeText, {
                                                fontSize: type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16
                                            }]}>{prices[0].size}</Text>
                                        </View>
                                        <Text style={styles.SizeCurrency}>{prices[0].currency + ' '}<Text style={styles.SizePrice}>{prices[0].price}</Text></Text>
                                    </View>
                                    <View style={styles.CartItemSingleQuantityContainer}>
                                        <TouchableOpacity
                                            onPress={() => decrementCartItemQuantityHandler(id, prices[0].size)}
                                            style={styles.CartItemIcon}>
                                            <Customicon name='minus' size={FONTSIZE.size_10} color={COLORS.primaryWhiteHex} />
                                        </TouchableOpacity>
                                        <View style={styles.CartItemQuantityContainer}>
                                            <Text style={styles.CartItemQuantityText}>{prices[0].quantity}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => incrementCartItemQuantityHandler(id, prices[0].size)}
                                            style={styles.CartItemIcon}>
                                            <Customicon name='add' size={FONTSIZE.size_10} color={COLORS.primaryWhiteHex} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                    </LinearGradient>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    CartItemLinearGradient: {
        flex: 1,
        gap: SPACING.space_12,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25
    },
    CartItemRow: {
        flex: 1,
        flexDirection: 'row',
        gap: SPACING.space_12
    },
    CartItemImage: {
        width: 130,
        height: 130,
        borderRadius: BORDERRADIUS.radius_20
    },
    CartItemInfo: {
        flex: 1,
        paddingVertical: SPACING.space_4,
        justifyContent: 'space-between'
    },
    CartItemTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex
    },
    CartItemSubtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex
    },
    CartItemRoastedContainer: {
        width: 50 * 2 + SPACING.space_20,
        height: 50,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex
    },
    CartItemRoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex
    },
    CartItemRowConatiner: {
        flex: 1,
        alignItems: 'center',
        gap: SPACING.space_20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    CartItemSizeValueContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    SizeBox: {
        backgroundColor: COLORS.primaryBlackHex,
        width: 100,
        height: 40,
        borderRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex
    },
    SizeCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex
    },
    SizePrice: {
        color: COLORS.primaryWhiteHex
    },
    CartItemIcon: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_10
    },
    CartItemQuantityContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        width: 80,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        paddingVertical: SPACING.space_4
    },
    CartItemQuantityText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex
    },
    CartItemSingleLinearGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.space_12,
        gap: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25
    },
    CartItemSingleImage: {
        width: 150,
        height: 150,
        borderRadius: BORDERRADIUS.radius_20
    },
    CartItemSingleInfo: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around'
    },
    CartItemSingleSizeValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    CartItemSingleQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})
export default CartItem