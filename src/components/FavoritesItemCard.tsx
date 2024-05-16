import { ImageProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageBackGroundInfo from './ImageBackGroundInfo'
import LinearGradient from 'react-native-linear-gradient'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'

interface FavoritesItemCardProps {
    id: string
    name: string
    imagelink_portrait: string
    ingredients: string
    special_ingredient: string
    average_rating: number
    ratings_count: string
    roasted: string
    description: string
    favourite: boolean
    type: string
    ToggleFavouriteItem: any
}

const FavoritesItemCard: React.FC<FavoritesItemCardProps> = ({ id, name, imagelink_portrait, ingredients, special_ingredient, average_rating, ratings_count, roasted, description, favourite, type, ToggleFavouriteItem }) => {
    return (
        <View style={styles.CardContainer}>
            <ImageBackGroundInfo
                EnableBackHandler={false}
                imagelink_portrait={imagelink_portrait}
                type={type}
                id={id}
                favourite={favourite}
                name={name}
                special_ingredient={special_ingredient}
                ingredients={ingredients}
                average_rating={average_rating}
                ratings_count={ratings_count}
                roasted={roasted}
                ToggleFavourite={ToggleFavouriteItem} />
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.ContainerLinearGradient}>
                <Text style={styles.DescriptionTitle}>Description</Text>
                <Text style={styles.DescriptionText}>{description}</Text>
            </LinearGradient>
        </View>
    )
}


const styles = StyleSheet.create({
    CardContainer: {
        borderRadius: BORDERRADIUS.radius_25,
        overflow: 'hidden'
    },
    ContainerLinearGradient: {
        gap: SPACING.space_10,
        padding: SPACING.space_20
    },
    DescriptionTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.secondaryLightGreyHex
    },
    DescriptionText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        textAlign: 'justify'
    }
})
export default FavoritesItemCard