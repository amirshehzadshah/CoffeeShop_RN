import { Button, Dimensions, FlatList, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/store'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { StatusBar } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Customicon from '../components/Customicon';
import CoffeeCard from '../components/CoffeeCard';

const MenuScreen = ({ navigation }: any) => {

    const getData = useStore((state: any) => state.getData)
    const CoffeeList = useStore((state: any) => state.CoffeeList)
    const BeanList = useStore((state: any) => state.BeanList)

    const addToCart = useStore((state: any) => state.addToCart)
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice)

    const [activeButton, setActiveButton] = useState(1);

    const ListRef: any = useRef<FlatList>();

    const handleCoffees = () => {
        setActiveButton(1)
    }

    const handleBeans = () => {
        setActiveButton(2)
    }

    const CardAddToCartHandler = ({
        id, name, roasted, imagelink_square, special_ingredient, prices, type, index
    }: any) => {
        addToCart({
            id, name, roasted, imagelink_square, special_ingredient, prices, type, index
        })
        calculateCartPrice()
        ToastAndroid.showWithGravity(`${name} is Add to Cart`, ToastAndroid.SHORT, ToastAndroid.CENTER)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <View style={styles.ScreenContainer}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                <StatusBar backgroundColor={COLORS.primaryBlackHex} />
                <HeaderBar title='Menu' navigation={navigation} navigatePath='' />
                <Text style={styles.ScreenText}>Choose From Our{'\n'}Best Menu</Text>
                <Text style={styles.CoffeeBeansTitle}>We will make your coffee on order.</Text>
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        onPress={() => handleCoffees()}
                        style={activeButton === 1 ? styles.activeTabButton : styles.TabButton}>
                        <Text style={styles.ButtonText}>Coffees</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleBeans()}
                        style={activeButton === 2 ? styles.activeTabButton : styles.TabButton}>
                        <Text style={styles.ButtonText}>Beans</Text>
                    </TouchableOpacity>
                </View>
                {activeButton === 1 ?
                    <>
                        <Text style={styles.CoffeeBeansTitle}>Select your favourite!</Text>
                        <FlatList
                            ref={ListRef}
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}  // Disable scrolling for FlatList
                            ListEmptyComponent={
                                <View style={styles.EmptyListContainer}>
                                    <Text style={styles.CatagoryText} >No Coffee Available</Text>
                                </View>
                            }
                            data={CoffeeList}
                            numColumns={2}
                            columnWrapperStyle={styles.columnWrapper}
                            ItemSeparatorComponent={() => <View style={styles.ItemSeparator} />}
                            contentContainerStyle={styles.FlatListContainer}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.CoffeeCardContainer}
                                        onPress={() => {
                                            navigation.push('Details', {
                                                index: item.index,
                                                id: item.id,
                                                type: item.type
                                            })
                                        }}>
                                        <CoffeeCard
                                            id={item.id}
                                            name={item.name}
                                            imagelink_square={item.imagelink_square}
                                            special_ingredient={item.special_ingredient}
                                            price={item.prices[2]}
                                            average_rating={item.average_rating}
                                            type={item.type}
                                            roasted={item.roasted}
                                            index={item.index}
                                            buttonPressHandler={CardAddToCartHandler} />
                                    </TouchableOpacity>
                                )
                            }} />
                    </> : <>
                        <Text style={styles.CoffeeBeansTitle}>What's your choice?</Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            scrollEnabled={false}  // Disable scrolling for FlatList
                            data={BeanList}
                            numColumns={2}
                            columnWrapperStyle={styles.columnWrapper}
                            ItemSeparatorComponent={() => <View style={styles.ItemSeparator} />}
                            contentContainerStyle={styles.FlatListContainer}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.CoffeeCardContainer}
                                        onPress={() => {
                                            navigation.push('Details', {
                                                index: item.index,
                                                id: item.id,
                                                type: item.type
                                            })
                                        }}>
                                        <CoffeeCard
                                            id={item.id}
                                            name={item.name}
                                            imagelink_square={item.imagelink_square}
                                            special_ingredient={item.special_ingredient}
                                            price={item.prices[2]}
                                            average_rating={item.average_rating}
                                            type={item.type}
                                            roasted={item.roasted}
                                            index={item.index}
                                            buttonPressHandler={CardAddToCartHandler} />
                                    </TouchableOpacity>
                                )
                            }} />
                    </>
                }
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
        flexGrow: 1
    },
    ScreenText: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        paddingLeft: SPACING.space_30
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: SPACING.space_20,
        marginVertical: SPACING.space_10,
    },
    TabButton: {
        // backgroundColor: COLORS.primaryOrangeHex,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_36 * 1.5,
        marginHorizontal: SPACING.space_10,
        borderColor: COLORS.primaryOrangeHex,
        borderWidth: 2,
        borderRadius: BORDERRADIUS.radius_20
    },
    activeTabButton: {
        backgroundColor: COLORS.primaryOrangeHex, // Change this to indicate active state
        flex: 1,
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
    CoffeeBeansTitle: {
        fontSize: FONTSIZE.size_18,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_20,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex
    },
    EmptyListContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_20 * 5.88
    },
    CatagoryText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryLightGreyHex,
        marginBottom: SPACING.space_4
    },
    FlatListContainer: {
        gap: SPACING.space_2,
        paddingVertical: SPACING.space_20,
        paddingHorizontal: SPACING.space_30,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: SPACING.space_20 // vertical space between rows
    },
    ItemSeparator: {
        height: SPACING.space_20 // space between rows
    },
    CoffeeCardContainer: {
        // paddingHorizontal: SPACING.space_10,
        // borderWidth: 2,
        // borderColor: 'red'
    }
})
export default MenuScreen