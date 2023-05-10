import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthContext} from "../components/AuthContext/context";
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from "react-native-splash-screen";

// import screens
import SignInScreen from '../components/screens/AuthScreens/SignIn';
import SignUpScreen from '../components/screens/AuthScreens/SignUp';
import ResetPasswordScreen from '../components/screens/AuthScreens/ResetPassword';
import RecommendationsScreen from '../components/screens/MainScreens/Recommendations';
import MyTrainingScreen from '../components/screens/MainScreens/MyTraining';
import CoursesScreen from '../components/screens/MainScreens/Courses';
import ViewGuideSinglePageScreen from '../components/screens/MainScreens/ViewGuideSinglePage';
import NewsLineScreen from '../components/screens/MainScreens/NewsLine';
import AccountScreen from '../components/screens/MainScreens/Account';
import ChangePasswordScreen from '../components/screens/MainScreens/ChangePassword';



// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();




const RootNavigator = () => {
    // AsyncStorage.clear()
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const initialLoginState = {
        isLoading: true,
        userToken: null,
    };

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async (foundUser, callback) => {
            setIsLoading(true);
            const userToken = String(foundUser.token);
            const user_id = String(foundUser.user_id);

            // setUserToken(userToken);

            try {
                await AsyncStorage.setItem('userToken', userToken);
                await AsyncStorage.setItem('userId', user_id);
            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'LOGIN',  token: userToken});
            setIsLoading(false);
            callback();
        },
        signOut: async (callback) => {
            try {
                await AsyncStorage.removeItem('userToken');
                setIsLoading(false);

            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'LOGOUT'});
            callback();
        },
        signUp: () => {
            // setIsLoading(false);
        }
    }), []);



    // Проверка при входе в приложение.
    React.useEffect(() => {


        setTimeout(async () => {
            // await AsyncStorage.removeItem('userToken', userToken);
            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                setIsLoading(false);
                SplashScreen.hide();
            } catch (e) {
                console.log(e);
            }
            dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
        }, 2000);
    }, []);


    //
    // if (isLoading) {
    //     return (
    //         <View style={{flex:1, width: '100%'}}>
    //             <Image source={require('./assets/images/splashscreen.png')} style={{flex:1, width: '100%', height: '100%', resizeMode: 'cover'}}/>
    //         </View>
    //     )
    // }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>

                {loginState.userToken !== null ?
                    (
                    <Stack.Navigator
                        initialRouteName='RecommendationsScreen'
                        screenOptions={{
                            headerShown: false,
                            animationEnabled: true,
                            detachPreviousScreen: true,
                            presentation: 'transparentModal'
                        }}
                    >



                        <Stack.Screen
                            name="RecommendationsScreen"
                            component={RecommendationsScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />

                        <Stack.Screen
                            name="MyTrainingScreen"
                            component={MyTrainingScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />

                        <Stack.Screen
                            name="CoursesScreen"
                            component={CoursesScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />

                        <Stack.Screen
                            name="ViewGuideSinglePageScreen"
                            component={ViewGuideSinglePageScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />

                        <Stack.Screen
                            name="NewsLineScreen"
                            component={NewsLineScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />


                        <Stack.Screen
                            name="AccountScreen"
                            component={AccountScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />
                        <Stack.Screen
                            name="ChangePasswordScreen"
                            component={ChangePasswordScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />




                    </Stack.Navigator>


                    )

                    :

                    <Stack.Navigator
                        initialRouteName='SignInScreen'
                        screenOptions={{
                            headerShown: false,
                            animationEnabled: true,
                            detachPreviousScreen: true,
                            presentation: 'transparentModal'
                        }}
                    >

                        <Stack.Screen
                            name="SignInScreen"
                            component={SignInScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />

                        <Stack.Screen
                            name="SignUpScreen"
                            component={SignUpScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />

                        <Stack.Screen
                            name="ResetPasswordScreen"
                            component={ResetPasswordScreen}
                            options={({route}) => ({
                                tabBarButton: () => null,
                                tabBarStyle: {display: 'none'},
                            })}
                        />

                    </Stack.Navigator>


                }

            </NavigationContainer>


        </AuthContext.Provider>
        );
};

export default RootNavigator;
