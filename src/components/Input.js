import React from 'react';
import { Text, View, TextInput, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

const Input = (props) => (
    <TextInput
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        multiline={props.multiline}
        value={props.value}
        onChangeText={(value) => props.onChangeText(value)}
        style={[{
            padding: 5,
            height: '60%',
            color: '#424242',
            borderBottomColor: '#b7b7b7',
            borderBottomWidth: 1
        }, props.style]}
    />
);

export { Input };

