import { Image, ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'

interface CartItemProps {
    id: string
    name: string
    imagelink_square: ImageProps
    special_ingredient: string
    roasted: string
    prices: any
    type: string
    incrementCartItemQuantityHandler: any
    decrementCartItemQuantityHandler: any
}

const CartItem: React.FC<CartItemProps> = ({
    id, name, imagelink_square, special_ingredient, roasted, prices, type, incrementCartItemQuantityHandler, decrementCartItemQuantityHandler
}) => {
    return (
        <View>
            {
                prices.length != 1
                ? <LinearGradient
                start={{x:0, y: 0}}
                end={{x: 1, y: 1}}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.CartItemLinearGradient}>
                    <View style={styles.CartItemRow}>
                        <Image source={imagelink_square} style={styles.CartItemImage} />
                        <View style={styles.CartItemInfo}>
                            <View>
                                <Text style={styles.CartItemTitle}>{name}</Text>
                                <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
                : <></>
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
    }
})
export default CartItem