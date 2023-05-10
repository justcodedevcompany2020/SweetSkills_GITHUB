import * as React from 'react';
import {useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import Footer from '../../includes/Footer';
import ReadMore from '@fawazahmed/react-native-read-more'


import BackIcon from  '../../../../assets/svg/backIcon';
import PasswordEyeNotShowSvg from '../../../../assets/svg/passwordEyeNotShow';
import PasswordEyeShowSvg from '../../../../assets/svg/passwordEyeShow';
import CloseIcon from '../../../../assets/svg/close_icon';


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
    Platform,
    Linking,
    Pressable,
    Dimensions
} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ChangePassword (props) {


    // const [old_password, setOldPassword] = useState('');
    // const [old_password_error, setOldPasswordError] = useState(false);
    // const [old_password_error_text, setOldPasswordErrorText] = useState('');


    const [new_password, setNewPassword] = useState('');
    const [new_password_error, setNewPasswordError] = useState(false);
    const [new_password_error_text, setNewPasswordErrorText] = useState('');


    // const [old_password_security, setOldPasswordSecurity] = useState(true);
    const [new_password_security, setNewPasswordSecurity] = useState(true);
    const [show_success_popup, setShowSuccessPopup] = useState(false);


    const context = useContext(AuthContext);




    const redirectToAccountScreen = () => {
        props.navigation.navigate('AccountScreen')
    }




    const resetPassword = async () => {
        let userToken = await AsyncStorage.getItem('userToken');

        // if (old_password.length == 0  || new_password.length == 0) {
            // if (old_password.length == 0) {
            //     setOldPasswordError(true)
            //     setOldPasswordErrorText('Поле обязательно')
            // } else {
            //     setOldPasswordError(false)
            //     setOldPasswordErrorText('')
            // }
        //
        // }

        if (new_password.length == 0) {
            setNewPasswordError(true)
            setNewPasswordErrorText('Поле обязательно')
        } else {
            setNewPasswordError(false)
            setNewPasswordErrorText('')

            try {
                fetch(`https://sweetskills.cc/api/profile/changepswd`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: userToken,
                        password: new_password,
                    })

                }).then((response) => {
                    return response.json()
                }).then((response) => {


                    console.log(response, 'reset password')

                    if (response.hasOwnProperty('status')) {
                        if (response.status == 'ok') {
                            setShowSuccessPopup(true)
                        }
                    }

                })
            } catch (e) {
                console.log(e)
            }
        }



    }



    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.change_password_header}>
                <TouchableOpacity style={styles.change_password_back_btn} onPress={() => redirectToAccountScreen()}>
                    <BackIcon/>
                </TouchableOpacity>
                <Text style={styles.change_password_header_title}>Сменить пароль</Text>
                <Text style={styles.change_password_header_info}>
                    Надежный пароль предотвращает несанкционированный доступ к аккаунту.
                </Text>
            </View>

            <KeyboardAwareScrollView
                style={styles.change_password_wrapper}
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
            >
                {/*<View style={{width: '100%', marginBottom: 32}}>*/}
                {/*    <View style={styles.change_password_input_title_wrapper}>*/}
                {/*        <Text style={[styles.change_password_input_title]}>Старый пароль</Text>*/}
                {/*        <TextInput*/}
                {/*            style={[styles.change_password_input_field]}*/}
                {/*            onChangeText={(val) => setOldPassword(val)}*/}
                {/*            value={old_password}*/}
                {/*            placeholder='......'*/}
                {/*            placeholderTextColor='#1C1D1E'*/}
                {/*            secureTextEntry={old_password_security}*/}
                {/*        />*/}



                {/*        {old_password_security &&*/}
                {/*        <TouchableOpacity style={{position: 'absolute', zIndex: 9, right: 0, top: 30}}*/}
                {/*                          onPress={() =>*/}
                {/*                              setOldPasswordSecurity(false)*/}
                {/*                          }*/}
                {/*        >*/}
                {/*            <PasswordEyeNotShowSvg/>*/}
                {/*        </TouchableOpacity>*/}

                {/*        }*/}

                {/*        {!old_password_security &&*/}
                {/*        <TouchableOpacity style={{position: 'absolute', zIndex: 9, right: 0, top: 30}}*/}
                {/*                          onPress={() =>*/}
                {/*                              setOldPasswordSecurity(true)*/}
                {/*                          }*/}
                {/*        >*/}
                {/*            <PasswordEyeShowSvg/>*/}
                {/*        </TouchableOpacity>*/}

                {/*        }*/}



                {/*    </View>*/}
                {/*    {old_password_error &&*/}
                {/*    <Text style={{color: '#DD5353', fontSize: 13, fontWeight: '500',paddingTop: 10 }}>{old_password_error_text}</Text>*/}
                {/*    }*/}
                {/*</View>*/}

                <View style={{width: '100%', marginBottom: 32}}>
                    <View style={styles.change_password_input_title_wrapper}>
                        <Text style={[styles.change_password_input_title]}>Новый пароль</Text>
                        <TextInput
                            style={[styles.change_password_input_field]}
                            onChangeText={(val) =>  setNewPassword(val)}
                            value={new_password}
                            placeholder='......'
                            placeholderTextColor='#1C1D1E'
                            placeholderStyle={{
                                fontWeight: '700',
                                fontSize: 22,
                            }}
                            secureTextEntry={new_password_security}
                        />



                        {new_password_security &&
                        <TouchableOpacity style={{position: 'absolute', zIndex: 9, right: 0, top: 30}}
                                          onPress={() =>
                                              setNewPasswordSecurity(false)
                                          }
                        >
                            <PasswordEyeNotShowSvg/>
                        </TouchableOpacity>

                        }

                        {!new_password_security &&
                        <TouchableOpacity style={{position: 'absolute', zIndex: 9, right: 0, top: 30}}
                                          onPress={() =>
                                              setNewPasswordSecurity(true)

                                          }
                        >
                            <PasswordEyeShowSvg/>
                        </TouchableOpacity>

                        }

                    </View>

                    {new_password_error &&
                    <Text style={{color: '#DD5353', fontSize: 13, fontWeight: '500',paddingTop: 10 }}>{new_password_error_text}</Text>
                    }
                </View>
                <TouchableOpacity style={styles.change_password_main_btn} onPress={() => resetPassword()}>
                    <Text style={styles.change_password_main_btn_text}>Сменить пароль</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>

            <Footer active_page={'account'} navigation={props.navigation}/>


            {show_success_popup &&
                <View style={styles.success_popup}>
                    <View style={styles.success_popup_wrapper}>
                        <TouchableOpacity style={styles.close_icon} onPress={() => {
                            setShowSuccessPopup(false)
                        }}>
                            <CloseIcon/>
                        </TouchableOpacity>
                        <Text style={styles.success_popup_title}>Ваш пароль изменен</Text>
                    </View>
                </View>
            }
        </SafeAreaView>
    );
}

export default ChangePassword;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        width: "100%",
        height:  '100%',
        paddingTop: 30,

    },

    change_password_header: {
        width: '100%',
        paddingHorizontal: 16,
        marginBottom: 48
    },

    change_password_back_btn: {
       marginBottom: 12,
    },
    change_password_header_title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1C1D1E',
        textAlign: 'center',
        marginBottom: 5,
    },
    change_password_header_info: {
        fontSize: 13,
        fontWeight: '500',
        color: '#333435',
        textAlign: 'center',
    },
    change_password_wrapper: {
        width: '100%',
        height: '100%',
        flex: 1,
        paddingHorizontal: 16,
    },
    change_password_input_title_wrapper: {
        width: '100%',
        // marginBottom: 32,
        borderBottomWidth: 1,
        borderBottomColor: '#1C1D1E',
        // paddingBottom: 8,
    },
    change_password_input_title: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6B7683',
    },

    change_password_input_field: {
        width: '90%',
        fontSize: 16,
        fontWeight: '500',
        color: '#1C1D1E',
    },

    change_password_main_btn: {
        width: '100%',
        height: 48,
        backgroundColor: '#CCDD53',
        alignItems: 'center',
        justifyContent: 'center',
    },
    change_password_main_btn_text: {
        fontWeight: '700',
        fontSize: 15,
        color: '#FFFFFF',
    },
    success_popup: {
        backgroundColor:  'rgba(0, 0, 0, 0.6)',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 999,
        zIndex: 999999,
        width: '100%',
        height: windowHeight,
        position: 'absolute',
        left: 0,
        bottom: 0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    success_popup_wrapper: {
        width: '80%',
        height: 200,
        backgroundColor: '#ffffff',
        paddingTop: 70,
        paddingHorizontal: 10,
        position: 'relative',

    },
    close_icon: {
      position: 'absolute',
      right: 20,
      top: 20,
    },
    success_popup_title: {
        fontWeight: '700',
        fontSize: 22,
        color: '#1C1D1E',
        textAlign: 'center',
    },
});
