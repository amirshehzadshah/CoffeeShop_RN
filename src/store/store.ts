import { create } from "zustand";
import { persist } from "zustand/middleware";
import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";
import { createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const useStore = create(
    persist(
        (set, get) => ({
            CoffeeList: CoffeeData,
            BeanList: BeansData,
            CartPrice: 0,
            FavorvitesList: [],
            CartList: [],
            OrderHistoryList: []
        }),
        {
            name: 'Coffee-app',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)