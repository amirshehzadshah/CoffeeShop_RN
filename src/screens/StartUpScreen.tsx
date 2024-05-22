import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import image from '../assets/img/startupbackground.png'
import logo from '../assets/img/startuplogo.png'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'

const StartUpScreen = ({ navigation }: any) => {
    
    const handleStartUp = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <ImageBackground
                    source={image}
                    style={styles.BackgroundImage}>
                    <View style={styles.LogoImageContainer}>
                        <Image source={logo} style={styles.LogoImage} />
                    </View>
                    <View style={styles.TextContainer}>
                        <Text style={styles.WelcomeText}>Welcome to</Text>
                        <Text style={styles.CoffeeShopText}>Coffee Shop</Text>
                    </View>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity
                            onPress={handleStartUp}
                            style={styles.Button}>
                            <Text style={styles.ButtonText}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex
    },
    ScrollViewFlex: {
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    BackgroundImage: {
        width: '100%',
        aspectRatio: 15 / 25,
        justifyContent: 'space-between'
    },
    LogoImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_36 * 3,
    },
    TextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_36,
    },
    WelcomeText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_30 * 1.2,
        color: COLORS.secondaryLightGreyHex
    },
    CoffeeShopText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_30 * 1.5,
        color: COLORS.primaryOrangeHex
    },
    ButtonContainer: {
        justifyContent: 'center',
        padding: SPACING.space_36 * 2,
    },
    Button: {
        backgroundColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_36 * 1.5,
        marginHorizontal: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_20
    },
    ButtonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex
    },
})
export default StartUpScreen