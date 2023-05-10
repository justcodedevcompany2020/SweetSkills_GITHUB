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

    const [phone, setPhone] = useState('');
    const [phone_error, setPhoneError] = useState(false);
    const [phone_error_text, setPhoneErrorText] = useState('');

    const [sign_up_header_info_exist, setSignInHeaderInfoExist] = useState(true);

    const [password_security, setPasswordSecurity] = useState(true);

    const context = useContext(AuthContext);


    const register = async () => {
        let new_phone = phone.replace(/\D/g, '');

        if (email.length == 0 || new_phone.length ==  0 || password.length == 0) {
                if (email.length == 0) {
                    setEmailError(true)
                    setEmailErrorText('Поле обязательно')
                } else {
                    setEmailError(false)
                    setEmailErrorText('')
                }
                if (new_phone.length == 0) {
                    setPhoneError(true)
                    setPhoneErrorText('Поле обязательно')
                } else {
                    setPhoneError(false)
                    setPhoneErrorText('')
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
            setPhoneError(false)
            setPhoneErrorText('')
            setPasswordError(false)
            setPasswordErrorText('')

            try {
                fetch(`https://sweetskills.cc/api/reg`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        phone: new_phone,
                        password: password,
                    })

                }).then((response) => {
                    return response.json()
                }).then((response) => {
                    if (response.hasOwnProperty('status')) {
                        if (response.status == 'exist') {
                                setEmailError2(true)
                                setEmailErrorText2('Учётная запись с такой электронной почтой уже существует')

                        } else if (response.status == 'ok') {

                            let foundUser = {
                                token: response.token,
                                user_id: response.user_id,
                            }

                            context.signIn(foundUser, () => {
                                props.navigation.navigate('RecommendationsScreen')

                            }).then(r => console.log("success"));
                            setEmailError2(false)
                            setEmailErrorText2('')
                        }
                    }

                    console.log(response, 'register')

                })
            } catch (e) {
                console.log(e)
            }
        }



    }


    const phoneValidation = (val) => {

        let x = val
            .replace(/\D/g, '')
            .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        let myPhone = !x[2]
            ? '+7 ' + (x[1] != '7' ? x[1] : '')
            : !x[3]
                ? '+7 (' + x[2]
                : '+7 (' +
                x[2] +
                ') ' +
                (x[3] ? x[3] : '') +
                (x[4] ? ' - ' + x[4] : '') +
                (x[5] ? ' - ' + x[5] : '');

        const isValid = validatePhoneNumber(myPhone);
        // setPhoneButtonDisable(isValid)

        setPhone(myPhone);
    }

    function validatePhoneNumber(phoneNumber) {
        let regex = /^((\7|7|8)+([0-9]){10})$/;
        let new_phone = phoneNumber.replace(/\D/g, '');
        return regex.test(new_phone);

    }




    const redirectToSignInScreen = () => {
        props.navigation.navigate('SignInScreen')
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.sign_up_header}>
                <Text style={styles.sign_up_header_title}>Создать учетную запись</Text>

                {email_error2 ?
                  <Text style={{color: '#DD5353', fontSize: 13, fontWeight: '500', textAlign: 'center'}}>{email_error_text2}</Text>
                    :
                    <Text style={styles.sign_up_header_info}>Пожалуйста, заполните поля
                        для регистрации</Text>
                }

            </View>
            <KeyboardAwareScrollView style={styles.sign_up_wrapper}
                                     enableOnAndroid={true}
                                     enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.sign_up_wrapper_input_title_wrapper}>
                    <Text style={[styles.sign_up_wrapper_input_title]}>Введите ваш адрес электронный почты</Text>
                    <TextInput
                        style={[styles.sign_up_wrapper_input_field, {borderBottomColor: email_error2 ? '#DD5353' : '#1C1D1E'}]}
                        onChangeText={(val) => setEmail(val)}
                        value={email}
                        placeholder='youremail@gmail.com'
                        placeholderTextColor='#1C1D1E'
                    />

                    {email_error &&
                      <Text style={{color: '#DD5353', fontSize: 13, fontWeight: '500',paddingTop: 10 }}>{email_error_text}</Text>
                    }


                </View>
                <View style={styles.sign_up_wrapper_input_title_wrapper}>
                    <Text style={[styles.sign_up_wrapper_input_title]}>Введите ваш номер телефона</Text>
                    <TextInput
                        style={[styles.sign_up_wrapper_input_field, {borderBottomColor:  '#1C1D1E'}]}
                        // onChangeText={(val) => setPhone(val)}
                        onChangeText={(val) => {
                            phoneValidation(val)
                        }}
                        value={phone}
                        placeholder='+7 999 999 99 99'
                        placeholderTextColor='#1C1D1E'
                        keyboardType={'phone-pad'}
                    />

                    {phone_error &&
                    <Text style={{color: '#DD5353', fontSize: 13, fontWeight: '500',paddingTop: 10 }}>{phone_error_text}</Text>
                    }


                </View>
                <View style={styles.sign_up_wrapper_input_title_wrapper}>
                    <Text style={[styles.sign_up_wrapper_input_title]}>Введите ваш пароль</Text>
                    <TextInput
                        style={[styles.sign_up_wrapper_input_field, {borderBottomColor: '#1C1D1E'}]}
                        onChangeText={(val) => setPassword(val)}
                        value={password}
                        placeholder='......'
                        placeholderTextColor='#1C1D1E'
                        secureTextEntry={password_security}

                    />

                    {password_error &&
                         <Text style={{color: '#DD5353', fontSize: 13, fontWeight: '500', paddingTop: 10}}>{password_error_text}</Text>
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

                <TouchableOpacity style={styles.sign_up_create_new_account_btn} onPress={() => register()}>
                    <Text style={styles.sign_up_create_new_account_btn_text}>Создать учетную запись</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.terms_of_use_btn}>
                    <Text style={styles.terms_of_use_btn_text}>Пользовательское соглашение</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>

            {/*<View style={styles.sign_in_footer}>*/}
            {/* */}

            {/*</View>*/}

            <View style={styles.sign_up_footer_create_new_account_btn_line_box}>
                <View style={styles.sign_up_footer_create_new_account_btn_line}></View>
                <TouchableOpacity style={styles.sign_up_footer_create_new_account_btn} onPress={() => redirectToSignInScreen()}>
                    <Text style={styles.sign_up_footer_create_new_account_btn_text}>Уже есть учётная запись</Text>
                </TouchableOpacity>
                <View style={styles.sign_up_footer_create_new_account_btn_line}></View>
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
    sign_up_header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 64,
        paddingHorizontal: 15,
    },
    sign_up_header_title: {
        color: '#1C1D1E',
        fontWeight: '700',
        fontSize: 22,
        marginBottom: 8,
    },
    sign_up_header_info: {
        fontWeight: '500',
        fontSize: 13,
        color: '#333435',
    },

    sign_up_wrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        paddingHorizontal: 15,
        marginBottom: 30
    },

    sign_up_wrapper_input_title_wrapper: {
        width: '100%',
        marginBottom: 32,
    },
    sign_up_wrapper_input_title: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6B7683',
    },
    sign_up_wrapper_input_field: {
        width: '100%',
        fontSize: 16,
        fontWeight: '400',
        color: '#1C1D1E',
        borderBottomWidth: 1,
        paddingBottom: 8,
    },

    sign_up_footer: {
        width: '100%',
        paddingHorizontal: 15,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 200,
    },

    sign_up_create_new_account_btn: {
        width: '100%',
        height: 48,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        backgroundColor: '#CCDD53',

    },

    sign_up_create_new_account_btn_text: {
        fontWeight: '700',
        fontSize: 15,
        color: '#ffffff',
    },

    terms_of_use_btn_text: {
        fontWeight: '600',
        fontSize: 12,
        color: '#6B7683',
        textDecorationLine: 'underline',
    },
    terms_of_use_btn: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },

    sign_up_footer_create_new_account_btn_line_box: {
        width: '100%',
        marginBottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    sign_up_footer_create_new_account_btn_line: {
        width: 92,
        height: 2,
        backgroundColor: '#CCDD53',
    },
    sign_up_footer_create_new_account_btn_text: {
        fontWeight: '600',
        fontSize: 14,
        color: '#1C1D1E',
    },

});
