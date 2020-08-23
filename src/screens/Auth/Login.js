import React, { useState, useEffect, useRef } from 'react';
import {
    Text, View, ScrollView,
    SafeAreaView, Animated, Keyboard
} from 'react-native';
import { Icon } from 'native-base'
import { Input, Button } from '../../components'
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { login } from '../../actions'
import { StackActions } from '@react-navigation/native';
import { LOCAL_AUTH_ID, USER } from '../../actions/types';
import AsyncStorage from '@react-native-community/async-storage';

import * as RootNavigation from '../../RootNavigation';
import { colors } from '../../style';



const Login = (props) => {
    const [email, setEmail] = useState('test@test.com')
    const [password, setPassword] = useState('123456')

    const animation = useRef(new Animated.Value(0)).current;

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
        Keyboard.addListener("keyboardWillHide", _keyboardWillHide);

        return () => {
            Keyboard.removeListener("keyboardWillShow", _keyboardWillShow);
            Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
        };


    }, []);

    const _keyboardWillShow = (e) => {
        const height = e.endCoordinates.height
        Animated.timing(animation, {
            toValue: -height + 34,
            duration: 300
        }).start();
    };

    const _keyboardWillHide = (e) => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 300
        }).start();
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between' }}>
                <Text onPress={() => props.navigation.pop()} style={{ color: colors.main, fontSize: 14 }}>Vazgeç</Text>
                <Icon style={{ color: colors.main }} type="FontAwesome" name={'twitter'} fontSize={40} />
                <Icon style={{ color: colors.main }} type="FontAwesome" name={'ellipsis-h'} fontSize={25} />
            </View>

            <View style={{ flex: 9 }}>
                <ScrollView style={{ padding: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, width: '70%', marginBottom: 20, textAlign: 'left', }}>Twitter'a giriş yap</Text>

                    <Input
                        placeholder={'Telefoni e-posta veya kullanıcı adı'}
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />

                    <Input
                        placeholder={'Şifre'}
                        secureTextEntry
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                    />

                </ScrollView>
            </View>



            <Animated.View
                style={
                    [{
                        flex: 0.6,
                        backgroundColor: '#edeeef',
                        borderTopColor: '#b7b7b7',
                        borderTopWidth: 0.3,
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                        justifyContent: 'space-between'
                    },
                    {
                        transform: [
                            {
                                translateY: animation,
                            }
                        ]

                    }
                    ]
                }>
                <Text style={{ color: colors.main, fontSize: 14 }}>Şifreni mi unuttun?</Text>

                <Button
                    text={'Giriş yap'}
                    onPress={() => {
                        const params = { email, password }
                        props.login(params)
                    }}
                    style={{ width: '25%', height: 30 }}
                />
            </Animated.View>

        </SafeAreaView>
    )
}

const mapStateToProps = ({ authResponse }) => {
    const { loading, user } = authResponse;
    return { loading, user };
};

export default connect(mapStateToProps, { login })(Login);
