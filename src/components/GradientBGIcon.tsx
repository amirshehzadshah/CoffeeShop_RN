import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING } from '../theme/theme';
import Customicon from './Customicon';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface GradientBGIconProps {
    name: string;
    color: string;
    size: number;
}

const GradientBGIcon: React.FC<GradientBGIconProps> = ({name, color, size}) => {
  return (
    <View style={styles.Container}>
      <LinearGradient
      start={{x:0, y:0}}
      end={{x:1, y:1}}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.LinearGradient}>
        <Customicon name={name} color={color} size={size} />
      </LinearGradient>
    </View>
  )
}


const styles = StyleSheet.create({
    Container: {
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        borderRadius: SPACING.space_12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex,
        overflow: 'hidden'
    },
    LinearGradient: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default GradientBGIcon