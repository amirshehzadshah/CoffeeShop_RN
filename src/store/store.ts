import { create } from "zustand";
import { persist } from "zustand/middleware";
import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";
import { createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { produce } from "immer";
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export const useStore = create(
    persist(
        (set) => ({
            userToken: null,
            UserDetails: [],
            CoffeeList: [],
            // BeanList: BeansData,
            BeanList: [],
            CartPrice: 0,
            FavoritesList: [],
            CartList: [],
            OrderHistoryList: [],
            login: async (email: string, password: string) => {
                const userCredential = await auth().signInWithEmailAndPassword(email, password);
                set({ userToken: userCredential.user.uid });
            },
            register: async (email: string, password: string, username: string) => {
                const userCredential = await auth().createUserWithEmailAndPassword(email.trim(), password);
                const docRef = userCredential.user.uid;
                await firestore().collection('users').doc(userCredential.user.uid).set({ id:docRef, username, email, password });
            },
            googleSignIn: async () => {
                try {
                  await GoogleSignin.hasPlayServices();
                  const { idToken } = await GoogleSignin.signIn();
                  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                  const userCredential = await auth().signInWithCredential(googleCredential);
                  set({ userToken: userCredential.user.uid });
                } catch (error) {
                  console.error('Google Sign-In error:', error);
                }
              },
            resetPassword: async (email: string) => {
                console.log('email', email)
                await auth().sendPasswordResetEmail(email);
                console.log('Done Store')
            },
            logout: () => {
                auth().signOut();
                set({ userToken: null });
            },
            getUserToken: () => {
                const user = auth().currentUser;
                set({ userToken: user ? user.uid : null });
            },
            getData: async () => {
                try {
                    console.log('API hit Start')
                    const userdata = await firestore().collection('users').get();
                    const userDataArray = userdata.docs.map(doc => doc.data());
                    // console.log("🕵️‍♂️ > file: store.ts:50 > getData: > userdata: ", userDataArray);

                    set({ UserDetails: userDataArray })

                    const coffeedata = await firestore().collection('coffees_shop').get();
                    // const coffeedata = await firestore().collection('bean_shop_test').get();
                    const coffeeDataArray = coffeedata.docs.map(doc => doc.data());
                    // console.log("🕵️‍♂️ > file: store.ts:25 > getData: > coffeedata: ", coffeeDataArray);

                    set({ CoffeeList: coffeeDataArray })
                    // set((state: any) => {
                    //     state.CoffeeList = coffeeDataArray
                    // })
                    const beandata = await firestore().collection('beans_shop').get();
                    const beanDataArray = beandata.docs.map(doc => doc.data());
                    // console.log("🕵️‍♂️ > file: store.ts:25 > getData: > beandata: ", beanDataArray);
                    set({ BeanList: beanDataArray })
                    console.log('API hit End')
                } catch (error) {
                    console.log("🕵️‍♂️ > file: store.ts:33 > getData:async > error: ", error);
                }
            },
            addToCart: (cartItem: any) => set(produce(state => {
                let found = false;
                for (let i = 0; i < state.CartList.length; i++) {
                    if (state.CartList[i].id == cartItem.id) {
                        found = true;
                        let size = false;
                        for (let j = 0; j < state.CartList[i].prices.length; j++) {
                            if (
                                state.CartList[i].prices[j].size == cartItem.prices[0].size
                            ) {
                                size = true;
                                state.CartList[i].prices[j].quantity++;
                                break;
                            }
                        }
                        if (size == false) {
                            state.CartList[i].prices.push(cartItem.prices[0]);
                        }
                        state.CartList[i].prices.sort((a: any, b: any) => {
                            if (a.size > b.size) {
                                return -1;
                            }
                            if (a.size < b.size) {
                                return 1;
                            }
                            return 0;
                        });
                        break;
                    }
                }
                if (found == false) {
                    state.CartList.push(cartItem);
                }
            }),
            ),
            calculateCartPrice: () => set(produce(state => {
                let totalprice = 0;
                for (let i = 0; i < state.CartList.length; i++) {
                    let tempprice = 0;
                    for (let j = 0; j < state.CartList[i].prices?.length; j++) {
                        tempprice = tempprice + parseFloat(state.CartList[i].prices[j].price) * state.CartList[i].prices[j].quantity

                        console.log("🕵️‍♂️ > file: store.ts:84 > tempprice: ", tempprice);

                    }
                    state.CartList[i].ItemPrice = tempprice.toFixed(2).toString()
                    totalprice = totalprice + tempprice

                    console.log("🕵️‍♂️ > file: store.ts:87 > totalprice: ", totalprice);

                }
                state.CartPrice = totalprice.toFixed(2).toString()
            })),
            addToFavoriteList: (pid: string, type: string, id: string) =>
                set(
                    produce(state => {
                        // console.log("🕵️‍♂️ > file: store.ts:89 > index: ", pid);
                        // console.log("🕵️‍♂️ > file: store.ts:89 > type: ", type);
                        // console.log("🕵️‍♂️ > file: store.ts:90 > id: ", id);
                        if (type == 'Coffee') {
                            for (let i = 0; i < state.CoffeeList.length; i++) {
                                if (state.CoffeeList[i].id == id) {
                                    if (state.CoffeeList[i].favourite == false) {
                                        state.CoffeeList[i].favourite = true;
                                        state.FavoritesList?.unshift(state.CoffeeList[i]);
                                    } else {
                                        state.CoffeeList[i].favourite = false;
                                    }
                                    break;
                                }
                            }
                        } else if (type == 'Bean') {
                            for (let i = 0; i < state.BeanList.length; i++) {
                                if (state.BeanList[i].id == id) {
                                    if (state.BeanList[i].favourite == false) {
                                        state.BeanList[i].favourite = true;
                                        state.FavoritesList.unshift(state.BeanList[i]);
                                    } else {
                                        state.BeanList[i].favourite = false;
                                    }
                                    break;
                                }
                            }
                        }
                        const doc = firestore().collection(type === 'Coffee' ? 'coffees_shop' : 'beans_shop').doc();
                        const pid = doc.id

                        console.log("🕵️‍♂️ > file: store.ts:122 > docRef: ", doc.id);

                        // Update Firestore document
                        const docRef = firestore().collection(type === 'Coffee' ? 'coffees_shop' : 'beans_shop').doc();
                        docRef.update({
                            favourite: true // or false based on your logic
                        }).then(() => {
                            console.log("Document successfully updated in Firestore!");
                        }).catch((error) => {
                            console.error("Error updating document in Firestore: ", error);
                        });
                    }),
                ),
            deleteFromFavoriteList: (type: string, id: string) =>
                set(
                    produce(state => {
                        console.log("🕵️‍♂️ > file: store.ts:121 > type: ", type);
                        console.log("🕵️‍♂️ > file: store.ts:122 > id: ", id);
                        if (type == 'Coffee') {
                            for (let i = 0; i < state.CoffeeList.length; i++) {
                                if (state.CoffeeList[i].id == id) {
                                    if (state.CoffeeList[i].favourite == true) {
                                        state.CoffeeList[i].favourite = false;
                                    } else {
                                        state.CoffeeList[i].favourite = true;
                                    }
                                    break;
                                }
                            }
                        } else if (type == 'Beans') {
                            for (let i = 0; i < state.BeanList.length; i++) {
                                if (state.BeanList[i].id == id) {
                                    if (state.BeanList[i].favourite == true) {
                                        state.BeanList[i].favourite = false;
                                    } else {
                                        state.BeanList[i].favourite = true;
                                    }
                                    break;
                                }
                            }
                        }
                        let spliceIndex = -1;
                        for (let i = 0; i < state.FavoritesList?.length; i++) {
                            if (state.FavoritesList[i].id == id) {
                                spliceIndex = i;
                                break;
                            }
                        }
                        state.FavoritesList?.splice(spliceIndex, 1);
                    }),
                ),
            incrementCartItemQuantity: (id: string, size: string) => set(produce(state => {
                for (let i = 0; i < state.CartList.length; i++) {
                    if (state.CartList[i].id == id) {
                        for (let j = 0; j < state.CartList[i].prices.length; j++) {
                            if (state.CartList[i].prices[j].size == size) {
                                state.CartList[i].prices[j].quantity++;
                                break;
                            }
                        }
                    }
                }
            })),
            decrementCartItemQuantity: (id: string, size: string) => set(produce(state => {
                for (let i = 0; i < state.CartList.length; i++) {
                    if (state.CartList[i].id == id) {
                        for (let j = 0; j < state.CartList[i].prices.length; j++) {
                            if (state.CartList[i].prices[j].size == size) {
                                if (state.CartList[i].prices.length > 1) {
                                    if (state.CartList[i].prices[j].quantity > 1) {
                                        state.CartList[i].prices[j].quantity--;
                                    }
                                    else {
                                        state.CartList[i].prices.splice(j, 1);
                                    }
                                }
                                else {
                                    if (state.CartList[i].prices[j].quantity > 1) {
                                        state.CartList[i].prices[j].quantity--;
                                    }
                                    else {
                                        state.CartList.splice(i, 1);
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            })),
            orderHstoryListFromCart: () => set(produce(state => {
                let temp = state.CartList.reduce(
                    (accumulator: number, currentValue: any) => accumulator + parseFloat(
                        currentValue.ItemPrice
                    ), 0
                )
                if (state.OrderHistoryList.length > 0) {
                    state.OrderHistoryList.unshift({
                        orderDate: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
                        CartList: state.CartList,
                        cartListPrice: temp.toFixed(2).toString()
                    })
                }
                else {
                    state.OrderHistoryList.push({
                        orderDate: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
                        CartList: state.CartList,
                        cartListPrice: temp.toFixed(2).toString()
                    })
                }
                state.CartList = [];
            }))
        }),
        {
            name: 'Coffee-app',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)