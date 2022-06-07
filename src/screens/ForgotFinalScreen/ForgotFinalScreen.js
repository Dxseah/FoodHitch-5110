import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function ForgotFinalScreen({navigation, route}) {
    const [new1, setnew1] = useState('')
    const [new2, setnew2] = useState('')
    const {email} = route.params
    console.log(email)
    const onUpdatePress = () => {
        navigation.navigate('Login')
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView 
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
            <Text style={styles.wordText}> Update Password</Text>
            <TextInput
                    style={styles.input}
                    placeholder='New password'
                    placeholderTextColor="#000000"
                    onChangeText={(text) => setnew1(text)}
                    value={new1}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
            />
            <TextInput
                    style={styles.input2}
                    placeholder='Reconfirm password'
                    placeholderTextColor="#000000"
                    onChangeText={(text) => setnew2(text)}
                    value={new2}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
            />
            <TouchableOpacity style = {styles.button}
                onPress={() => {}}
            >
                <Text style={styles.buttonTitle}> Continue</Text>
            </TouchableOpacity>

            </KeyboardAwareScrollView>
        </SafeAreaView>


    )
}