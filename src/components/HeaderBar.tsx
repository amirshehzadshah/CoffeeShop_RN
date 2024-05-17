import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';
import { TouchableOpacity } from 'react-native';

interface HeaderBarProps {
    title: string;
    navigation: any;
    navigatePath: string
}

const HeaderBar: React.FC<HeaderBarProps> = ({ navigation, navigatePath, title }) => {
    return (
        <View style={styles.HeaderContainer}>
            {
                navigatePath ?
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(`${navigatePath}`)
                        }}>
                        <GradientBGIcon name='menu' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => {
                            navigation.pop()
                        }}>
                        <GradientBGIcon name='left' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
                    </TouchableOpacity>
            }
            <Text style={styles.HeaderText}>{title}</Text>
            <ProfilePic />
        </View>
    )
}


const styles = StyleSheet.create({
    HeaderContainer: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    HeaderText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex
    }
})
export default HeaderBar