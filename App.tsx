import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import TabNavigator from './src/navigators/TabNavigator';
import MenuScreen from './src/screens/MenuScreen';
import StartUpScreen from './src/screens/StartUpScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { useStore } from './src/store/store';
import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

const App = () => {

  const { userToken, getUserToken }: any = useStore();

  console.log("🕵️‍♂️ > file: App.tsx:18 > App > userToken: ", userToken);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1098461650125-h2ttcrm03edc05lsvot851itpbu0luaf.apps.googleusercontent.com', // Replace with your actual web client ID
    });

    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        getUserToken();
      } else {
        console.log('No User Affected')
      }
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  // useEffect(() => {
  //   getUserToken();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken ? (
          <>
            <Stack.Screen name='Tab' component={TabNavigator} options={
              {
                animation: 'slide_from_bottom'
              }
            } />
            <Stack.Screen name='Menu' component={MenuScreen} options={
              {
                animation: 'slide_from_bottom'
              }
            } />
            <Stack.Screen name='Details' component={DetailsScreen} options={
              {
                animation: 'slide_from_bottom'
              }
            } />
            <Stack.Screen name='Payment' component={PaymentScreen} options={
              {
                animation: 'slide_from_bottom'
              }
            } />
          </>
        ) : (
          <>
            <Stack.Screen name='StartUp' component={StartUpScreen} options={
              {
                animation: 'slide_from_bottom'
              }
            } />
            <Stack.Screen name='Login' component={LoginScreen} options={
              {
                animation: 'slide_from_bottom'
              }
            } />
            <Stack.Screen name='SignUp' component={SignUpScreen} options={
              {
                animation: 'slide_from_bottom'
              }
            } />
            <Stack.Screen name='ForgetPassword' component={ForgetPasswordScreen} options={
              {
                animation: 'slide_from_bottom'
              }
            } />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App