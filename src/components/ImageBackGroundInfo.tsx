import { ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme'
import GradientBGIcon from './GradientBGIcon'

interface ImageBackGroundInfoProps {
    EnableBackHandler: boolean
    id: string
    name: string
    roasted: string
    imagelink_portrait: ImageProps
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
  return (
    <View>
      <ImageBackground
      source={imagelink_portrait}
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
      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({
    ItemBackgroundImage: {
        width: '100%',
        aspectRatio: 20 /25,
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
    }
})
export default ImageBackGroundInfo