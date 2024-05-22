import { Button, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import logo from '../assets/img/logo-icon.png'
import google_icon from '../assets/img/Logo-google-icon.png'
import { TextInput } from 'react-native'
import { Formik } from 'formik'
import validationSchema from '../validation/validationSchema'
import PaymentMethod from '../components/PaymentMethod'
import LinearGradient from 'react-native-linear-gradient'

interface FormValues {
    email: string;
    password: string;
}

const LoginScreen = ({navigation}: any) => {

    const initialValues: FormValues = { email: '', password: '' };

    const hanldeSigninWithGoogle = () => {
        console.log('values');
    };
    
    const hanldeRegister = () => {
        navigation.navigate('SignUp')
    };

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View style={styles.LogoImageContainer}>
                    <Image source={logo} style={styles.LogoImage} />
                </View>
                <View style={styles.TextContainer}>
                    <Text style={styles.WelcomeText}>Welcome,</Text>
                    <Text style={styles.CoffeeShopText}>Glad To See You!</Text>
                </View>
                <View style={styles.FormContainer}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log('values:', values);
                        }}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                        }) => (
                            <View>
                                {touched.email && errors.email && (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                )}
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email Address"
                                    placeholderTextColor={COLORS.primaryLightGreyHex}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                {touched.password && errors.password && (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                )}
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor={COLORS.primaryLightGreyHex}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry
                                />
                                <TouchableOpacity
                                    // onPress={handleSubmit}
                                    style={styles.ForgetPasswordButton}>
                                    <Text style={styles.ForgetPasswordButtonText}>Forget Password?</Text>
                                </TouchableOpacity>
                                <View style={styles.LoginButtonContainer}>
                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        style={styles.Button}>
                                        <Text style={styles.ButtonText}>Login</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
                <View style={styles.LoginDividerContainer}>
                    <View style={styles.DividerLine} />
                    <Text style={styles.LoginDividerText}>Or Login With</Text>
                    <View style={styles.DividerLine} />
                </View>
                <View style={styles.SigninWithGoogleContainer}>
                    <TouchableOpacity
                        onPress={hanldeSigninWithGoogle}>
                        <View style={styles.SigninWithGoogleCardContainer}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                                style={styles.LinearGradientRegular}>
                                <Image source={google_icon} style={styles.SigninWithGoogleImage} />
                                <Text style={styles.SigninWithGoogleTitle}>Signin with google</Text>
                            </LinearGradient>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.BottomTextContainer}>
                    <Text style={styles.AccountText}>Don’t have an account?</Text>
                    <TouchableOpacity
                        onPress={hanldeRegister}>
                    <Text style={styles.RegisterText}>Register Now!</Text>
                    </TouchableOpacity>
                </View>
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
        // justifyContent: 'space-between'
    },
    LogoImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.space_36 * 1.5,
        // borderWidth: 2, borderColor: 'red'
    },
    TextContainer: {
        paddingHorizontal: SPACING.space_36,
        // borderWidth: 2, borderColor: 'red'
    },
    WelcomeText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_30,
        color: COLORS.primaryWhiteHex
    },
    CoffeeShopText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_30,
        color: COLORS.primaryWhiteHex
    },
    FormContainer: {
        paddingHorizontal: SPACING.space_36,
        // borderWidth: 2, borderColor: 'red'
    },
    input: {
        padding: SPACING.space_10,
        marginVertical: SPACING.space_10,
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        borderRadius: BORDERRADIUS.radius_10
    },
    errorText: {
        fontSize: FONTSIZE.size_14,
        color: 'red',
    },
    ForgetPasswordButton: {
        alignItems: 'flex-end'
    },
    ForgetPasswordButtonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryOrangeHex
    },
    LoginButtonContainer: {
        marginVertical: SPACING.space_10,
        paddingVertical: SPACING.space_10,
        paddingHorizontal: SPACING.space_36,
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
    LoginDividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: SPACING.space_36,
        // borderWidth: 2, borderColor: 'red'
    },
    LoginDividerText: {
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
    },
    DividerLine: {
        height: 2,
        width: 100,
        backgroundColor: 'white',
        alignSelf: 'stretch',
        marginVertical: 10
    },
    SigninWithGoogleContainer: {
        paddingHorizontal: SPACING.space_36,
        paddingVertical: SPACING.space_24,
        // borderWidth: 2, borderColor: 'red'
    },
    SigninWithGoogleCardContainer: {
        borderRadius: BORDERRADIUS.radius_15 * 2,
        backgroundColor: COLORS.primaryGreyHex,
        borderWidth: 3
    },
    LinearGradientRegular: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.space_12,
        paddingHorizontal: SPACING.space_24,
        gap: SPACING.space_24,
        borderRadius: BORDERRADIUS.radius_15 * 2
    },
    SigninWithGoogleTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex
    },
    SigninWithGoogleImage: {
        width: SPACING.space_30,
        height: SPACING.space_30
    },
    BottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_36,
        paddingVertical: SPACING.space_36 * 1.2,
        // borderWidth: 2, borderColor: 'red'
    },
    AccountText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex
    },
    RegisterText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryOrangeHex
    },
})
export default LoginScreen