import * as React from 'react';
import {useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import PasswordEyeNotShowSvg from '../../../../assets/svg/passwordEyeNotShow';
import PasswordEyeShowSvg from '../../../../assets/svg/passwordEyeShow';


import {
    Text,
    Alert,
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    Platform
} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

function SignIn (props) {



    const [email, setEmail] = useState('');
    const [email_error, setEmailError] = useState(false);
    const [email_error_text, setEmailErrorText] = useState('');

    const [email_error2, setEmailError2] = useState(false);
    const [email_error_text2, setEmailErrorText2] = useState('');

    const [password, setPassword] = useState('');
    const [password_error, setPasswordError] = useState(false);
    const [password_error_text, setPasswordErrorText] = useState('');

    const [password_error2, setPasswordError2] = useState(false);
    const [password_error_text2, setPasswordErrorText2] = useState('');

    const [sign_in_header_info_exist, setSignInHeaderInfoExist] = useState(true);

    const [password_security, setPasswordSecurity] = useState(true);

    const context = useContext(AuthContext);


    const redirectToSignUpScreen = () => {
        props.navigation.navigate('SignUpScreen')
    }
    const redirectToRecommendationsScreen = () => {
            props.navigation.navigate('RecommendationsScreen')
    }
    const redirectToResetPasswordScreen = () => {
        props.navigation.navigate('ResetPasswordScreen')
    }

    const login = async () => {


        if (email.length == 0  || password.length == 0) {
             if (email.length == 0) {
                 setEmailError(true)
                 setEmailErrorText('Поле обязательно')
             } else {
                 setEmailError(false)
                 setEmailErrorText('')
             }
             if (password.length == 0) {
                 setPasswordError(true)
                 setPasswordErrorText('Поле обязательно')

             } else {
                 setPasswordError(false)
                 setPasswordErrorText('')
             }

        } else {
            setEmailError(false)
            setEmailErrorText('')
            setPasswordError(false)
            setPasswordErrorText('')

            try {
                fetch(`https://sweetskills.cc/api/login`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    })

                }).then((response) => {
                    return response.json()
                }).then((response) => {

                    if (response.hasOwnProperty('status')) {
                        if (response.status == "not exist") {
                            setEmailError2(true)
                            setEmailErrorText2('Пользователя с такой почтой не существует')
                        } else {
                            setEmailError2(false)
                            setEmailErrorText2('')
                        }

                        if (response.status == "not correct password") {
                            setPasswordError2(true)
                            setPasswordErrorText2('Пароль указан неверно')
                        } else {
                            setPasswordError2(false)
                            setPasswordErrorText2('')
                        }

                        if (response.status == 'ok') {
                            let foundUser = {
                                token: response.token,
                                user_id: response.user_id,
                            }

                            context.signIn(foundUser, () => {
                                props.navigation.navigate('RecommendationsScreen')

                            }).then(r => console.log("success"));
                            setEmailError2(false)
                            setEmailErrorText2('')
                            setPasswordError2(false)
                            setPasswordErrorText2('')
                        }
                    }
                    console.log(response, 'login')

                })
            } catch (e) {
                console.log(e)
            }
        }



    }


    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.sign_in_header}>
                <Text style={styles.sign_in_header_title}>Вход в учетную запись</Text>
                {password_error2 && !email_error2  &&
                        <Text style={{color: '#DD5353', fontSize: 13, fontWeight: '500', textAlign:'center' }}>{password_error_text2}</Text>
                }


                {!password_error2 && !email_error2 &&
                      <Text style={styles.sign_in_header_info}>Пожалуйста, заполните поля для входа в аккаунт</Text>

                }


                {email_error2  && !password_error2  &&
                    <Text style={{color: '#DD5353', fontSize: 13, fontWeight: '500', textAlign:'center' }}>{email_error_text2}</Text>
                }


            </View>
            <KeyboardAwareScrollView style={styles.sign_in_wrapper}
                                     enableOnAndroid={true}
                                     enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.sign_in_wrapper_input_title_wrapper}>
                    <Text style={[styles.sign_in_wrapper_input_title]}>Введите ваш адрес электронный почты</Text>
                    <TextInput
                        style={[styles.sign_in_wrapper_input_field, {borderBottomColor: email_error2 ? '#DD5353' : '#1C1D1E'}]}
                        onChangeText={(val) => setEmail(val)}
                        value={email}
                        placeholder='youremail@gmail.com'
                        placeholderTextColor='#1C1D1E'
                    />

                    {email_error &&
                    <Text style={{color: '#DD5353', fontSize: 13, fontWeight: '500',paddingTop: 10 }}>{email_error_text}</Text>
                    }
                </View>
                <View style={styles.sign_in_wrapper_input_title_wrapper}>
                    <Text style={[styles.sign_in_wrapper_input_title]}>Введите ваш пароль</Text>
                    <TextInput
                        style={[styles.sign_in_wrapper_input_field, {borderBottomColor: password_error2 ? '#DD5353' : '#1C1D1E'}]}
                        onChangeText={(val) => setPassword(val)}
                        value={password}
                        placeholder='......'
                        placeholderTextColor='#1C1D1E'
                        secureTextEntry={password_security}

                    />

                    {password_error &&
                    <Text style={{color: '#DD5353', fontSize: 13, fontWeight: '500',paddingTop: 10 }}>{password_error_text}</Text>
                    }


                    {password_security &&
                    <TouchableOpacity style={{position: 'absolute', zIndex: 9, right: 0, top: 30}}
                                      onPress={() =>
                                          setPasswordSecurity(false)
                                      }
                    >
                        <PasswordEyeNotShowSvg/>
                    </TouchableOpacity>

                    }

                    {!password_security &&
                    <TouchableOpacity style={{position: 'absolute', zIndex: 9, right: 0, top: 30}}
                                      onPress={() =>
                                          setPasswordSecurity(true)
                                      }
                    >
                       <PasswordEyeShowSvg/>
                    </TouchableOpacity>

                    }

                </View>

                <TouchableOpacity style={styles.sign_in_footer_login_btn} onPress={() => login()}>
                    <Text style={styles.sign_in_footer_login_btn_text}>Вход</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.sign_in_footer_forget_password_btn} onPress={() => redirectToResetPasswordScreen()}>
                    <Text style={styles.sign_in_footer_forget_password_btn_text}>Забыли пароль?</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>

            {/*<View style={styles.sign_in_footer}>*/}
            {/* */}

            {/*</View>*/}

            <View style={styles.sign_in_footer_create_new_account_btn_line_box}>
                <View style={styles.sign_in_footer_create_new_account_btn_line}></View>
                <TouchableOpacity style={styles.sign_in_footer_create_new_account_btn} onPress={() => redirectToSignUpScreen()}>
                    <Text style={styles.sign_in_footer_create_new_account_btn_text}>Создать новую учетную запись</Text>
                </TouchableOpacity>
                <View style={styles.sign_in_footer_create_new_account_btn_line}></View>
            </View>
        </SafeAreaView>
    );
}

export default SignIn;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        width: "100%",
        height:  '100%',
        paddingTop: 75,

    },
    sign_in_header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 64,
        paddingHorizontal: 15,
    },
    sign_in_header_title: {
        color: '#1C1D1E',
        fontWeight: '700',
        fontSize: 22,
        marginBottom: 8,
    },
    sign_in_header_info: {
        fontWeight: '500',
        fontSize: 13,
        color: '#333435',
    },

    sign_in_wrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        paddingHorizontal: 15,
        marginBottom: 30
    },

    sign_in_wrapper_input_title_wrapper: {
        width: '100%',
        marginBottom: 32,
    },
    sign_in_wrapper_input_title: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6B7683',
    },
    sign_in_wrapper_input_field: {
        width: '100%',
        fontSize: 16,
        fontWeight: '400',
        color: '#1C1D1E',
        borderBottomWidth: 1,
        paddingBottom: 8,
    },

    sign_in_footer: {
        width: '100%',
        paddingHorizontal: 15,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 200,
    },

    sign_in_footer_login_btn: {
        width: '100%',
        height: 48,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        backgroundColor: '#CCDD53',

    },

    sign_in_footer_login_btn_text: {
        fontWeight: '700',
        fontSize: 15,
        color: '#ffffff',
    },

    sign_in_footer_forget_password_btn_text: {
        fontWeight: '600',
        fontSize: 14,
        color: '#1C1D1E',
    },
    sign_in_footer_forget_password_btn: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },

    sign_in_footer_create_new_account_btn_line_box: {
        width: '100%',
        marginBottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    sign_in_footer_create_new_account_btn_line: {
        width: 69,
        height: 2,
        backgroundColor: '#CCDD53',
    },
    sign_in_footer_create_new_account_btn_text: {
        fontWeight: '600',
        fontSize: 14,
        color: '#1C1D1E',
    },

});
