import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store'

const OrderHistroyScreen = () => {
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList)

  console.log("🕵️‍♂️ > file: OrderHistroyScreen.tsx:8 > OrderHistroyScreen > OrderHistoryList: ", OrderHistoryList);

  return (
    <View>
      <Text>OrderHistroyScreen</Text>
    </View>
  )
}


const styles = StyleSheet.create({})
export default OrderHistroyScreen