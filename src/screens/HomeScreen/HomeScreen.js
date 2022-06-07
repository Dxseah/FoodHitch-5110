import React from 'react'
import { Text, View, Button } from 'react-native'
import { getAuth, signOut } from "firebase/auth";



export default function HomeScreen({route, navigation}) {
    const {email} = route.params;
    console.log(email)
    return (
        <View>
            <Text>Home Screen </Text>
            
            <Button 
                title="Sign Out"
                onPress={() => {
                    const auth = getAuth();
                    signOut(auth)
                    .then(() => {
                      // Sign-out successful.
                    }).catch((error) => {
                      // An error happened.
                    })
                    navigation.navigate('Login')}
                }
            />
        </View>

    )
}