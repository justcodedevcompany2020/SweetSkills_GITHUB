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

    const [password, setPassword] = useState('');
    const [password_error, setPasswordError] = useState(false);
    const [password_error_text, setPasswordErrorText] = useState('');

    const [sign_in_header_info_exist, setSignInHeaderInfoExist] = useState(true);

    const [password_security, setPasswordSecurity] = useState(true);

    const context = useContext(AuthContext);


    const redirectToSignUpScreen = () => {
        props.navigation.navigate('SignUpScreen')
    }
    const redirectToResetPasswordScreen = () => {
        props.navigation.navigate('ResetPasswordScreen')
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.sign_in_header}>
                <Text style={styles.sign_in_header_title}>Вход в учетную запись</Text>
                {sign_in_header_info_exist &&
                     <Text style={styles.sign_in_header_info}>Пожалуйста, заполните поля для входа в аккаунт</Text>
                }

            </View>
            <KeyboardAwareScrollView style={styles.sign_in_wrapper}
                                     enableOnAndroid={true}
                                     enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.sign_in_wrapper_input_title_wrapper}>
                    <Text style={[styles.sign_in_wrapper_input_title]}>Введите ваш адрес электронный почты</Text>
                    <TextInput
                        style={[styles.sign_in_wrapper_input_field, {borderBottomColor: '#1C1D1E'}]}
                        onChangeText={(val) => setEmail(val)}
                        value={email}
                        placeholder='youremail@gmail.com'
                        placeholderTextColor='#1C1D1E'
                    />

                </View>
                <View style={styles.sign_in_wrapper_input_title_wrapper}>
                    <Text style={[styles.sign_in_wrapper_input_title]}>Введите ваш пароль</Text>
                    <TextInput
                        style={[styles.sign_in_wrapper_input_field, {borderBottomColor: password_error ? '#DD5353' : '#1C1D1E'}]}
                        onChangeText={(val) => setPassword(val)}
                        value={password}
                        placeholder='......'
                        placeholderTextColor='#1C1D1E'
                        secureTextEntry={password_security}

                    />

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

                <TouchableOpacity style={styles.sign_in_footer_login_btn}>
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
