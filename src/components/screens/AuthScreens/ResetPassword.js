import * as React from 'react';
import {useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import BackIcon from '../../../../assets/svg/backIcon';



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


    const [reset_password_header_info_exist, setSignInHeaderInfoExist] = useState(true);

    const [reset_password_success_popup, setResetPasswordSuccessPopup] = useState(false);



    const context = useContext(AuthContext);


    const redirectToSignInScreen = () => {
        props.navigation.navigate('SignInScreen')
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.reset_password_header}>
                <TouchableOpacity style={styles.back_btn} onPress={() => redirectToSignInScreen()}>
                    <BackIcon/>
                </TouchableOpacity>
                <Text style={styles.reset_password_header_title}>Сбросить пароль</Text>
                {reset_password_header_info_exist &&
                <Text style={styles.reset_password_header_info}>
                    Введите адрес электронной почты, привязанный к вашей и учётной записи, и мы отправим вам временный пароль.
                </Text>
                }

            </View>
            <KeyboardAwareScrollView style={styles.reset_password_wrapper}
                                     enableOnAndroid={true}
                                     enableAutomaticScroll={(Platform.OS === 'ios')}>
                <View style={styles.reset_password_wrapper_input_title_wrapper}>
                    <Text style={[styles.reset_password_wrapper_input_title]}>Введите ваш адрес электронный почты</Text>
                    <TextInput
                        style={[styles.reset_password_wrapper_input_field, {borderBottomColor: email_error ? '#DD5353' : '#1C1D1E'}]}
                        onChangeText={(val) => setEmail(val)}
                        value={email}
                        placeholder='youremail@gmail.com'
                        placeholderTextColor='#1C1D1E'
                    />

                </View>

            </KeyboardAwareScrollView>

            <View style={styles.reset_password_footer}>

                <TouchableOpacity style={styles.reset_password_send_email_btn} onPress={() => setResetPasswordSuccessPopup(true)}>
                    <Text style={styles.reset_password_send_email_btn_text}>Отправить</Text>
                </TouchableOpacity>
            </View>


            {reset_password_success_popup &&
                <View style={styles.reset_password_success_popup_main_wrapper}>
                    <View style={styles.reset_password_success_popup_wrapper}>
                        <View style={styles.reset_password_success_popup_header}>
                            <Text style={styles.reset_password_success_popup_title}>Пароль отправлен!</Text>
                            <Text style={styles.reset_password_success_popup_info}>Письмо отправлено , проверьте почту и войдите в учетную запись</Text>
                        </View>

                        <View style={styles.reset_password_success_popup_footer}>
                            <TouchableOpacity style={styles.reset_password_success_popup_back_to_sign_in_btn} onPress={() => redirectToSignInScreen()}>
                                <Text style={styles.reset_password_success_popup_back_to_sign_in_btn_text}>Вернуться к входу</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
            }

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
        paddingTop: 40,

    },
    reset_password_header: {
        width: '100%',
        marginBottom: 48,
        paddingHorizontal: 15,
    },
    reset_password_header_title: {
        color: '#1C1D1E',
        fontWeight: '700',
        fontSize: 22,
        marginBottom: 8,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    reset_password_header_info: {
        fontWeight: '500',
        fontSize: 13,
        color: '#333435',
        width: '90%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },

    reset_password_wrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        paddingHorizontal: 15,
        marginBottom: 30
    },

    reset_password_wrapper_input_title_wrapper: {
        width: '100%',
        marginBottom: 32,
    },
    reset_password_wrapper_input_title: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6B7683',
    },
    reset_password_wrapper_input_field: {
        width: '100%',
        fontSize: 16,
        fontWeight: '400',
        color: '#1C1D1E',
        borderBottomWidth: 1,
        paddingBottom: 8,
    },

    reset_password_footer: {
        width: '100%',
        paddingHorizontal: 15,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },

    reset_password_send_email_btn: {
        width: '100%',
        height: 48,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        backgroundColor: '#CCDD53',

    },

    reset_password_send_email_btn_text: {
        fontWeight: '700',
        fontSize: 15,
        color: '#ffffff',
        textAlign: 'center'
    },

    back_btn: {
        width: '100%',
        marginBottom: 12,

    },
    reset_password_success_popup_main_wrapper: {
        backgroundColor:  'rgba(255, 255, 255, 0.25)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 999,
        zIndex: 999999,
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    reset_password_success_popup_wrapper: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        paddingTop: 75,
    },
    reset_password_success_popup_title: {
        fontWeight: '700',
        fontSize: 22,
        color: '#1C1D1E',
        marginBottom: 8,
    },
    reset_password_success_popup_info: {
        fontWeight: '500',
        fontSize: 13,
        color: '#333435',
        textAlign: 'center'
    },
    reset_password_success_popup_header: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 144,
        paddingHorizontal: 15
    },

    reset_password_success_popup_back_to_sign_in_btn: {
        width: '100%',
        height: 48,
        backgroundColor: '#CCDD53',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reset_password_success_popup_back_to_sign_in_btn_text: {
        fontWeight: '700',
        fontSize: 15,
        color: '#ffffff',
        textAlign: 'center'
    },

    reset_password_success_popup_footer: {
        width: '100%',
        paddingHorizontal: 16,
    }

});
