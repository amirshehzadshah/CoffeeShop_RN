import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface HeaderBarProps {
    title: string;
    navigation: any;
    navigatePath: string
}

const HeaderBar: React.FC<HeaderBarProps> = ({ navigation, navigatePath, title }) => {
    const [modalVisible, setModalVisible] = useState(false);
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
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <ProfilePic />
            </TouchableOpacity>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                {/* <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPressOut={() => setModalVisible(false)}
                > */}
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.LinearGradient}>
                    {/* <View style={styles.modalContent}> */}
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setModalVisible(false);
                            console.log('Account button pressed');
                        }}
                    >
                        <Text style={styles.modalButtonText}>Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setModalVisible(false);
                            console.log('Sign Out button pressed');
                        }}
                    >
                        <Text style={styles.modalButtonText}>Sign Out</Text>
                    </TouchableOpacity>
                    {/* </View> */}
                </LinearGradient>
                {/* </TouchableOpacity> */}
            </Modal>
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
    },
    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    LinearGradient: {
        // flex: 1,
        // height: SPACING.space_20,
        width: SPACING.space_36,
        alignItems: 'center',
        justifyContent: 'center',
        // marginVertical: SPACING.space_10,
        borderRadius: 10,
        paddingVertical: SPACING.space_10,
        paddingHorizontal: SPACING.space_36,
        borderWidth: 2, borderColor: 'red'
    },
    modalContent: {
        // width: 200,
        backgroundColor: 'white',
        // padding: 20,
        // alignItems: 'center',
    },
    modalButton: {
        backgroundColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_36 * 1.5,
        marginHorizontal: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_20
    },
    modalButtonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex
    },
})
export default HeaderBar