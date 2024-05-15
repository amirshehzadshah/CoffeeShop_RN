import { ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import GradientBGIcon from './GradientBGIcon'
import Customicon from './Customicon'

interface ImageBackGroundInfoProps {
    EnableBackHandler: boolean
    id: string
    name: string
    roasted: string
    imagelink_portrait: string
    ingredients: string
    special_ingredient: string
    average_rating: number
    ratings_count: string
    favourite: boolean
    type: string
    BackHandler?: any
    ToggleFavourite: any
}

const ImageBackGroundInfo: React.FC<ImageBackGroundInfoProps> = ({ EnableBackHandler, id, name, roasted, imagelink_portrait, ingredients, special_ingredient, average_rating, ratings_count, favourite, type, BackHandler, ToggleFavourite }) => {

//   console.log("🕵️‍♂️ > file: ImageBackGroundInfo.tsx:25 > Imagelink_portrait: ", imagelink_portrait);

  return (
    <View>
      <ImageBackground
      source={{uri: imagelink_portrait}}
      style={styles.ItemBackgroundImage}>
        {
            EnableBackHandler ? (
                <View style={styles.ImageHeaderBarContainerWithBack}>
                    <TouchableOpacity onPress={() => {
                        BackHandler()
                    }}>
                        <GradientBGIcon name='left' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        ToggleFavourite(favourite, type, id)
                    }}>
                        <GradientBGIcon name='like' color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.ImageHeaderBarContainerWithoutBack}>
                    <TouchableOpacity onPress={() => {
                        ToggleFavourite(favourite, type, id)
                    }}>
                        <GradientBGIcon name='like' color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                    </TouchableOpacity>
                </View>
            )
        }
        <View style={styles.ImageInfoOuterContainer}>
            <View style={styles.ImageInfoInnerContainer}>
                <View style={styles.InfoContainerRow}>
                    <View>
                        <Text style={styles.ItemTitleText}>{name}</Text>
                        <Text style={styles.ItemSubtitleText}>{special_ingredient}</Text>
                    </View>
                    <View style={styles.ItemPropertiesContainer}>
                        <View style={styles.PropertyContainer}>
                            <Customicon
                            name={type == 'Bean' ? 'bean' : 'beans'}
                            size={type == 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                            color={COLORS.primaryOrangeHex} />
                            <Text style={[styles.PropertyTextContainer,
                            {
                                marginTop: type == 'Bean' ? SPACING.space_4 + SPACING.space_2 : 0
                            }]}>{type}</Text>
                        </View>
                        <View style={styles.PropertyContainer}>
                            <Customicon
                            name={type == 'Bean' ? 'location' : 'drop'}
                            size={FONTSIZE.size_16}
                            color={COLORS.primaryOrangeHex}
                            style={styles.LastIconProperty} />
                            <Text style={styles.PropertyTextContainer}>{ingredients}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.InfoContainerRow}>
                    <View style={styles.RatingContainer}>
                        <Customicon name='star' color={COLORS.primaryOrangeHex} size={FONTSIZE.size_20} />
                        <Text style={styles.RatingText}>{average_rating}</Text>
                        <Text style={styles.RatingCountText}>({ratings_count})</Text>
                    </View>
                    <View style={styles.RoastedContainer}>
                        <Text style={styles.RoastedText}>{roasted}</Text>
                    </View>
                </View>
            </View>
        </View>
      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({
    ItemBackgroundImage: {
        width: '100%',
        aspectRatio: 20 / 25,
        justifyContent: 'space-between'
    },
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ImageHeaderBarContainerWithoutBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    ImageInfoOuterContainer: {
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
        borderTopRightRadius: BORDERRADIUS.radius_20 * 2
    },
    ImageInfoInnerContainer: {
        justifyContent: 'space-between',
        gap: SPACING.space_15
    },
    InfoContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ItemTitleText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex
    },
    ItemSubtitleText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex
    },
    ItemPropertiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_20
    },
    PropertyContainer: {
        width: 55,
        height: 55,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex
    },
    PropertyTextContainer: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex
    },
    LastIconProperty: {
        paddingVertical: SPACING.space_10/2.5
    },
    RatingContainer: {
        flexDirection: 'row',
        gap: SPACING.space_10,
        alignItems: 'center'
    },
    RatingText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex
    },
    RatingCountText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex
    },
    RoastedContainer: {
        width: 55 * 2 + SPACING.space_20,
        height: 55,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex
    },
    RoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryWhiteHex
    },
})
export default ImageBackGroundInfo