import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ImageProps } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface ProfileDropdownMenuProps {
  title: string;
  icon: ImageProps;
}

const ProfileDropdownMenu: React.FC<ProfileDropdownMenuProps> = ({ title, icon }) => {
  return (
    <View style={styles.DropdownMenuContainer}>
      <Image source={icon} style={styles.SizeIcon} />
      <Text style={styles.TitleText}>{title}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  DropdownMenuContainer: {
    flexDirection: 'row',
    marginVertical: SPACING.space_10,
    padding: SPACING.space_10/2,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_10
    // borderWidth: 2, borderColor: 'red'
  },
  SizeIcon: {
    width: 25,
    height: 25,
    // borderWidth: 2, borderColor: 'red'
  },
  TitleText: {
    paddingTop: SPACING.space_10/3,
    paddingHorizontal: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    // borderWidth: 2, borderColor: 'red'
  }
})
export default ProfileDropdownMenu