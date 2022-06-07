// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, SafeAreaView, Button, Alert} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import * as Application from 'expo-application';

// function HomeScreen({navigation}) {
//   const test = Application.applicationId
//   return (
//     <SafeAreaView style={styles.container}>
//         <Text>
//           FoodHitch!
//           {test}
//         </Text>
//         <StatusBar style="auto" />
//         <Button 
//           title="Lets go!"
//           onPress={()=>Alert.alert("Are you ready?","YESSIR",
//           [{text:"Yes",onPress:()=>navigation.navigate("Login")}])}/>
//     </SafeAreaView>

//   );
// }
// function LoginScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Start your journey!</Text>
//       <Button
//         title="Log In"
//         onPress={() => navigation.navigate('Login')}
//       />
//       <Button
//         title="Sign In"
//         onPress={() => navigation.navigate('Login')}
//       />
//     </View>
//   );
// }
// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'FoodHitch' }}/>
//         <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { LoginScreen, HomeScreen, RegistrationScreen, ForgotPasswordScreen, ForgotFinalScreen } from './src/screens'
import {decode, encode} from 'base-64'
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, doc, getDoc, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createNativeStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyD0mT8kkXdDA5xU1YFBNMrY7biuJ8r1R6U",
  authDomain: "orbital2022-896f4.firebaseapp.com",
  projectId: "orbital2022-896f4",
  storageBucket: "orbital2022-896f4.appspot.com",
  messagingSenderId: "447075136418",
  appId: "1:447075136418:web:6632af60158b85ba6a78fb",
  measurementId: "G-K043M3NHNF"
};
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  if (loading) {
    console.log('here')
    return (	
      <NavigationContainer>
        <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} 
      options={{
        title: 'Welcome to FoodHitch!',
        headerStyle: {
        backgroundColor: '#FFAC4B'
        }
      }}/>
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Home">
      {props => <HomeScreen {...props} extraData={user} />}
      </Stack.Screen>
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}
        options={{
          title: 'Forgot Password',
          headerStyle: {
          backgroundColor: '#FFAC4B'
          }
      }} > 
      </Stack.Screen>
      <Stack.Screen name="ForgotFinal" component={ForgotFinalScreen}
        options={{
          title: 'Forgot Password',
          headerStyle: {
          backgroundColor: '#FFAC4B'
          }
          }} />
          </Stack.Navigator>
    </NavigationContainer>

    )	
  }

  useEffect(() => {
    const db = getFirestore();
    const auth = getAuth();
    console.log(auth)
    const usersRef = collection(db, 'user');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, 'user', user.uid);
        const docSnap = getDoc(docRef)
        .then((document) => {
          const userData = document.data()
          setLoading(false)
          setUser(userData)
        })
        .catch((error) => {
          setLoading(false)
        });
      } else {
        setLoading(false)
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} 
            options={{
              title: 'Welcome to FoodHitch!',
              headerStyle: {
              backgroundColor: '#FFAC4B'
              }
            }}/>
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}
              options={{
                title: 'Forgot Password',
                headerStyle: {
                backgroundColor: '#FFAC4B'
                }
            }} > 
            </Stack.Screen>
            <Stack.Screen name="ForgotFinal" component={ForgotFinalScreen}
              options={{
                title: 'Forgot Password',
                headerStyle: {
                backgroundColor: '#FFAC4B'
                }
                }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
