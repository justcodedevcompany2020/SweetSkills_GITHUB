import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useColorScheme} from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import Footer from '../../includes/Footer';
import ReadMore from '@fawazahmed/react-native-read-more'


import BackCoursesIcon from  '../../../../assets/svg/backCoursesIcon';
import AccountIcon1 from  '../../../../assets/svg/accountIcon1';
import AccountIcon2 from  '../../../../assets/svg/accountIcon2';
import AccountIcon3 from  '../../../../assets/svg/accountIcon3';
import AccountIcon4 from  '../../../../assets/svg/accountIcon4';
import AccountLinkIcon from  '../../../../assets/svg/accountLinkIcon';


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
function Account (props) {

    const context = useContext(AuthContext);

    const [bonus, setBonus] = useState(0);
    const [profile_info, setProfileInfo] = useState(null);




    const redirectToSignInScreen = () => {
        props.navigation.navigate('SignInScreen')
    }
    const redirectToChangePasswordScreen = () => {
        props.navigation.navigate('ChangePasswordScreen')
    }

   const handlePress = () => {
        Linking.openURL('https://www.youtube.com/');
    };
   const handlePress2 = () => {
        Linking.openURL('https://web.telegram.org/z/');
    };

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            getProfileInfo()
        });

        return unsubscribe;
    }, [props.navigation])


   const logout = async () => {
       let userToken = await AsyncStorage.getItem('userToken');
       let AuthStr = 'Bearer ' + userToken;

       try {
           fetch(`https://sweetskills.cc/api/logout`, {
               method: 'POST',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                   token: userToken,
               })

           }).then((response) => {
               return response.json()
           }).then(async (response ) => {

               console.log(response, 'login out')
               if (response.hasOwnProperty('status')) {
                   if (response.status == 'ok') {
                       context.signOut(() => {
                           props.navigation.navigate('SignInScreen')

                       }).then(r => console.log("logOut"));
                   }
               }


           })
       } catch (e) {
           console.log(e)
       }
   }
   const getProfileInfo = async () => {
       let userToken = await AsyncStorage.getItem('userToken');
       try {
           fetch(`https://sweetskills.cc/api/profile`, {
               method: 'POST',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                   token: userToken,
               })

           }).then((response) => {
               return response.json()
           }).then( async (response ) => {

               console.log(response, 'profile')
                if (response.hasOwnProperty('status')) {
                     if (response.status == 'ok') {
                         await setProfileInfo(response)
                     }
                }





           })
       } catch (e) {
           console.log(e)
       }
   }




    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.accounts_header}>
                <Text style={styles.accounts_header_title}>Учётная запись</Text>
            </View>


            <ScrollView style={styles.accounts_wrapper}>

                <Text style={styles.accounts_email}>{profile_info?.email}</Text>
                <View style={styles.accounts_link_wrapper}>
                        <View style={styles.accounts_link_icon}>
                            <AccountIcon1/>
                        </View>
                        <TouchableOpacity style={styles.accounts_link_icon_title_wrapper} onPress={ () => Linking.openURL(profile_info?.wheel)}>
                            <Text  style={styles.accounts_link_title}>Колесо фортуны</Text>
                            <View>
                                <AccountLinkIcon/>
                            </View>
                        </TouchableOpacity>
                </View>
                <View style={styles.accounts_link_wrapper}>
                        <View style={styles.accounts_link_icon}>
                            <AccountIcon2/>
                        </View>

                    {profile_info?.balance > 0 ?
                        <Pressable style={styles.accounts_link_icon_title_wrapper} title='https://www.youtube.com/' onPress={ () => handlePress()}>
                            <Text  style={styles.accounts_link_title}>Баланс: {profile_info?.balance} р.</Text>
                            <View>
                                <AccountLinkIcon/>
                            </View>
                        </Pressable>
                        :

                        <View style={styles.accounts_link_icon_title_wrapper}>
                            <Text  style={styles.accounts_link_title}>Баланс: {profile_info?.balance} р.</Text>
                            <View>
                                <AccountLinkIcon/>
                            </View>
                        </View>
                    }

                </View>
                <View style={styles.accounts_link_wrapper}>
                        <View style={styles.accounts_link_icon}>
                            <AccountIcon3/>
                        </View>
                        <TouchableOpacity style={styles.accounts_link_icon_title_wrapper} onPress={() => redirectToChangePasswordScreen()}>
                            <Text  style={styles.accounts_link_title}>Сменить пароль</Text>
                            <View>
                                <AccountLinkIcon/>
                            </View>
                        </TouchableOpacity>
                </View>
                <View style={styles.accounts_link_wrapper}>
                        <View style={styles.accounts_link_icon}>
                            <AccountIcon4/>
                        </View>
                        <TouchableOpacity style={styles.accounts_link_icon_title_wrapper}  onPress={ () => Linking.openURL(profile_info?.support)}>
                            <Text  style={styles.accounts_link_title}>Написать в поддержку</Text>
                            <View>
                                <AccountLinkIcon/>
                            </View>
                        </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.account_log_out_btn} onPress={() => logout()}>
                    <Text style={styles.account_log_out_btn_text}>Выход</Text>
                </TouchableOpacity>
            </ScrollView>

            <Footer active_page={'account'} navigation={props.navigation}/>



        </SafeAreaView>
    );
}

export default Account;


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

    accounts_header: {
        width: '100%',
        marginBottom: 56,
        paddingBottom: 11,
        borderBottomWidth: 1,
        borderBottomColor: '#6b76834d',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingHorizontal: 16,

    },
    accounts_header_title: {
        fontSize: 17,
        fontWeight: '500',
        color: '#1C1D1E',
        textAlign: 'center'
    },

    accounts_wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingHorizontal: 16,
    },

    accounts_email: {
        marginBottom: 58,
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1D1E',
        textAlign: 'center'
    },
    accounts_link_wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 26,
        borderBottomWidth: 1,
        borderBottomColor: '#D3D6DA',
        paddingBottom: 27,
    },
    accounts_link_icon_title_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },

    accounts_link_icon: {
        marginRight: 13,
    },
    accounts_link_title: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1C1D1E',
    },
    account_log_out_btn: {
        marginTop: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    account_log_out_btn_text: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1C1D1E',
    }

});
