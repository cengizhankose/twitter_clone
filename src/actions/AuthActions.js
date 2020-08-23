import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILD,

    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILD,

    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_FAILD,

    SIGN_OUT_SUCCESS,

    BASE_URL
} from './types'
import AsyncStorage from '@react-native-community/async-storage'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as RootNavigation from '../RootNavigation';

import { Alert } from 'react-native'


// import { post } from './api'

export const login = (params) => {
    return (dispatch) => {
        if (params.email != '' && params.password != '') {
            if (validateEmail(params.email)) {

                dispatch({ type: LOGIN_START })
                auth()
                    .signInWithEmailAndPassword(params.email, params.password)
                    .then((data) => {
                        console.log('signed in!', data);
                        const uid = data.user._user.uid;


                        // read user from db
                        firestore()
                            .collection('Users')
                            .doc(uid)
                            .get().then((user) => {
                                console.log('Gelen Data: ', user._data);
                                dispatch({ type: LOGIN_SUCCESS, payload: user._data })


                            }).catch((err) => {
                                console.log('Read Data error: ', err);
                                dispatch({ type: LOGIN_FAILD })
                            })
                    })
                    .catch(error => {
                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');

                        } else if (error.code === 'auth/user-not-found') {
                            console.log('That email address is invalid!');
                            Alert.alert('Uyarı', 'Böyle bir kullanıcı bulunamadı!')
                        }
                        console.log(error.code);
                        dispatch({ type: LOGIN_FAILD })
                    })
            } else {
                Alert.alert('UYARI', 'Lütfen geçerli bir email yazınız!')
            }
        } else {
            Alert.alert('UYARI', 'Lütfen bütün alanları doldurunuz!')
        }
    }
}

export const register = (params) => {
    return (dispatch) => {
        if (params.email != '' && params.password != '' && params.firstname != '' && params.lastname != '') {
            if (validateEmail(params.email)) {
                auth()
                    .createUserWithEmailAndPassword(params.email, params.password)
                    .then((data) => {
                        const uid = data.user._user.uid;
                        // write user from db
                        const setData = {
                            name: params.name,
                            username: params.username,
                            email: params.email
                        }
                        firestore()
                            .collection('Users')
                            .doc(uid)
                            .set(setData)
                            .then(() => {
                                console.log('User added!');
                                RootNavigation.pop()
                            }).catch(() => {
                                console.log('User not Add!');
                            })

                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                            console.log('That email address is already in use!');
                        }
                        console.log(error);
                    });




            } else {
                Alert.alert('UYARI', 'Lütfen geçerli bir email yazınız!')
            }
        } else {
            Alert.alert('UYARI', 'Lütfen bütün alanları doldurunuz!')
        }
    }
}

export const isUser = () => {
    return (dispatch) => {
        dispatch({ type: LOGIN_START })
        auth().onAuthStateChanged((data) => {
            if(data) {
                console.log('Gelen Değer:', data);
                const uid = data._user.uid;
                getUser(uid, dispatch)
            } else {
                dispatch({ type: LOGIN_FAILD })
            }
        });
    }
}

export const signOut = () => {
    return (dispatch) => {
        auth()
            .signOut()
            .then(() => {
                dispatch({ type: SIGN_OUT_SUCCESS })
            });
    }
}

const getUser = (uid, dispatch) => {
    // read user from db
    firestore()
        .collection('Users')
        .doc(uid)
        .get().then((user) => {
            console.log('Gelen Data: ', user._data);
            dispatch({ type: LOGIN_SUCCESS, payload: user._data })
        }).catch((err) => {
            console.log('Read Data error: ', err);
            dispatch({ type: LOGIN_FAILD })
        })
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
