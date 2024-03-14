import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import Customicon from './Customicon';
import BGIcon from './BGIcon';
import { useStore } from '../store/store';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface CoffeeCardProps {
    id: string
    name: string
    imagelink_square: ImageProps
    special_ingredient: string
    price: any
    average_rating: number
    type: string
    roasted: string
    index: number
    buttonPressHandler: any
    cartList: any
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
    id,
    name,
    imagelink_square,
    special_ingredient,
    price,
    average_rating,
    type,
    roasted,
    index,
    buttonPressHandler,
    cartList
}) => {

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.CardLinearGradientContainer}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
            <ImageBackground source={imagelink_square} style={styles.CardImageBG} resizeMode='cover' >
                <View style={styles.CardRatingContainer}>
                    <Customicon name='star' color={COLORS.primaryOrangeHex} size={FONTSIZE.size_16} />
                    <Text style={styles.CardRatingText}>{average_rating}</Text>
                </View>
            </ImageBackground>
            <Text style={styles.CardTitle}>{name}</Text>
            <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
            <View style={styles.CardFooterRow}>
                <Text style={styles.CardPriceCurrency}>
                    $ <Text style={styles.CardPrice}>{price.price}</Text>
                </Text>
                {cartList && cartList.map((item: any, index: any) => {
                <TouchableOpacity onPress={() => {
                    buttonPressHandler({
                        id, index, type, roasted, imagelink_square, name, special_ingredient, prices: [{ ...price, quantity: 1 }]
                    })
                }}>
                    <BGIcon name='add' color={COLORS.primaryWhiteHex} size={FONTSIZE.size_10} BGColor={COLORS.primaryOrangeHex} />
                </TouchableOpacity>
                    if (item === 'C2') {
                        <Text style={{color: COLORS.primaryWhiteHex}}>C2</Text>
                    } else {
                        <Text style={{color: COLORS.primaryWhiteHex}}>Nothing</Text>
                    }
                })}
            </View>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    CardLinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25
    },
    CardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden'
    },
    CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomStartRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0
    },
    CardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        lineHeight: 22,
        fontSize: FONTSIZE.size_14
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10
    },
    CardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18
    },
    CardPrice: {
        color: COLORS.primaryWhiteHex
    }

})
export default CoffeeCard