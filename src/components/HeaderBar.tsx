import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ProfileDropdownMenu from './ProfileDropdownMenu';
import AccountIcon from '../assets/img/user-white.png'
import LogoutIcon from '../assets/img/logout-white.png'
import { useStore } from '../store/store';

interface HeaderBarProps {
    title: string;
    navigation: any;
    navigatePath: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ navigation, navigatePath, title }) => {

    const { logout } = useStore();
    const { userToken } = useStore();
    const UserDetails = useStore((state: any) => state.UserDetails)

    const currentUser = UserDetails.filter((item: any) => item.id == userToken)

    console.log("🕵️‍♂️ > file: HeaderBar.tsx:27 > currentUser: ", currentUser);
    console.log("🕵️‍♂️ > file: HeaderBar.tsx:27 > currentUser: ", currentUser.map(item => item.username));

    const [modalVisible, setModalVisible] = useState(false);

    // console.log("🕵️‍♂️ > file: HeaderBar.tsx:22 > modalVisible: ", modalVisible);


    const handleLogout = () => {
        console.log('Logout')
        logout();
        // navigation.navigate('Login');  // Navigate back to the Startup screen after logging out
    };

    return (
        // <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
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
            <View style={styles.ProfileMenuContainer}>
                <TouchableOpacity
                    style={styles.ProfileMenuTrigger}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <ProfilePic />
                </TouchableOpacity>
            </View>
            {modalVisible &&
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.ProfileDropdownMenuContainer}>
                    {
                        currentUser?.map((data: any) => (
                            <View>
                                <Text style={styles.Username}>{data?.username}</Text>
                                <Text style={styles.EmailAddress}>{data.email}</Text>
                            </View>
                        ))
                    }
                    <ProfileDropdownMenu icon={AccountIcon} title='Account' />
                    <TouchableOpacity onPress={handleLogout} >
                        <ProfileDropdownMenu icon={LogoutIcon} title='Logout' />
                    </TouchableOpacity>
                </LinearGradient>
            }
        </View >
        // </TouchableWithoutFeedback>
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
    ProfileDropdownMenuContainer: {
        position: 'absolute',
        top: SPACING.space_36 * 2,
        right: SPACING.space_30,
        zIndex: 99999,
        padding: SPACING.space_16,
        borderRadius: BORDERRADIUS.radius_20,
        // borderWidth: 2, borderColor: 'red'
    },
    Username: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex
    },
    EmailAddress: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex
    }
})
export default HeaderBar