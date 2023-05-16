import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme} from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import Footer from '../../includes/Footer';
import ReadMore from '@fawazahmed/react-native-read-more'
import BackCoursesIcon from  '../../../../assets/svg/backCoursesIcon';
import { Vimeo } from 'react-native-vimeo-iframe';


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
import CloseIcon from "../../../../assets/svg/close_icon";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ViewGuide (props) {

    const context = useContext(AuthContext);

    const [guides, setGuides] = useState([]);
    const [denied_guides_popup, setDeniedGuidesPopup] = useState(false);



    const redirectToTrainingScreen = () => {
        props.navigation.navigate('MyTrainingScreen')
    }

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            if (props.route.params.from_page == 'Guides') {
                getGuideInfo()
            } else if (props.route.params.from_page == 'Courses') {
                getCourseInfo()
            }


        });

        return unsubscribe;
    }, [props.navigation])



    const getCourseInfo = async () => {


        let userToken = await AsyncStorage.getItem('userToken');
        let course_id = props.route.params.course_id
        let guide_id = props.route.params.guides_id
        let from_page = props.route.params.from_page
        console.log(from_page, 'page')
        console.log(course_id, 'id')
        console.log(guide_id, 'id guide')

        try {

            fetch(`https://sweetskills.cc/api/courses/${course_id}/${guide_id}`, {
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

                console.log(response, 'guide info')


                if (response.hasOwnProperty('status')) {
                        if (response.status == 'ok') {
                             setGuides(response.elements)
                        }

                        if (response.status == 'invalid') {
                            context.signOut(() => {
                                props.navigation.navigate('SignInScreen')

                            }).then(r => console.log("logOut"));
                        }

                    if (response.status == 'denied') {
                        setDeniedGuidesPopup(true)
                    }
                }


            })
        } catch (e) {
            console.log(e)
        }
    }
    const getGuideInfo = async () => {

        let userToken = await AsyncStorage.getItem('userToken');
        let from_page = props.route.params.from_page
        let guide_id = props.route.params.guides_id
        console.log(from_page, 'page')

        console.log(guide_id, 'idddd')

        try {

            fetch(`https://sweetskills.cc/api/guides/${guide_id}`, {
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

                console.log(response, 'guide info')


                if (response.hasOwnProperty('status')) {
                        if (response.status == 'ok') {
                             setGuides(response.elements)
                        }

                        if (response.status == 'invalid') {
                            context.signOut(() => {
                                props.navigation.navigate('SignInScreen')

                            }).then(r => console.log("logOut"));
                        }

                        if (response.status == 'denied') {
                                setDeniedGuidesPopup(true)
                        }
                }


            })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.view_guide_header}>
                <TouchableOpacity style={styles.view_guide_header_back_btn} onPress={() => props.navigation.goBack()}>
                    <BackCoursesIcon/>
                </TouchableOpacity>

                {props.route.params.from_page == 'Guides' &&
                    <Text style={styles.view_guide_header_title}>Просмотр гайда</Text>
                }

                {props.route.params.from_page == 'Courses' &&
                    <Text style={styles.view_guide_header_title}>Просмотр урока</Text>
                }

            </View>


            <ScrollView style={styles.view_guide_wrapper}>
                <View style={styles.view_guide_wrapper_child_items_list_wrapper}>
                    {guides.map((item, index) => {
                        return(
                            <TouchableOpacity key={index} style={styles.view_guide_child_items_list_item}>
                                <View style={styles.view_guide_child_items_list_item_video_box}>
                                    {item.type == 'title' &&
                                         <Text style={styles.view_guide_child_items_list_item_main_title}>{item.option1}</Text>
                                    }
                                    {item.type == 'button' &&
                                        <TouchableOpacity style={styles.view_guide_child_items_list_item_routing_btn} onPress={() => Linking.openURL(item.option2)}>
                                            <Text style={styles.view_guide_child_items_list_item_routing_btn_text}>{item.option1}</Text>
                                        </TouchableOpacity>
                                    }

                                    {item.type == 'video' &&
                                        <View style={styles.view_guide_child_items_list_item_img}>
                                            <Vimeo
                                                videoId={item.option1}
                                                autoplay={true}
                                                style={{width: '100%', height: 300}}
                                                resizeMode="contain"
                                            />

                                        </View>

                                    }

                                    {item.type == 'text' &&
                                        <Text style={styles.view_guide_child_items_list_item_info_text}>{item.option2}</Text>
                                    }


                                </View>


                            </TouchableOpacity>
                        )

                    })}
                </View>

            </ScrollView>

            <Footer active_page={'training'} navigation={props.navigation}/>


            {denied_guides_popup &&
                <View style={styles.success_popup}>
                <View style={styles.success_popup_wrapper}>
                    <TouchableOpacity style={styles.close_icon} onPress={() => {
                        setDeniedGuidesPopup(false)
                    }}>
                        <CloseIcon/>
                    </TouchableOpacity>
                    <Text style={styles.success_popup_title}>Нет доступ</Text>
                    <TouchableOpacity style={styles.denied_btn} onPress={() => props.navigation.goBack()}>
                        <Text style={styles.denied_btn_text}>Назад</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }

        </SafeAreaView>
    );
}

export default ViewGuide;


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

    view_guide_header: {
        width: '100%',
        marginBottom: 16,
        paddingBottom: 11,
        borderBottomWidth: 1,
        borderBottomColor: '#6b76834d',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingHorizontal: 16,

    },
    view_guide_header_title: {
        fontSize: 17,
        fontWeight: '500',
        color: '#1C1D1E',
        textAlign: 'center'
    },

    view_guide_header_back_btn: {
        position: 'absolute',
        left: 8,
        top: 0,

    },
    view_guide_wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingHorizontal: 16,
    },


    view_guide_wrapper_child_items_list_wrapper: {
        width: '100%',
    },
    view_guide_child_items_list_item: {
        width: '100%',
        marginBottom: 24,
    },

    view_guide_child_items_list_item_main_title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1D1E',
        marginBottom: 16,
    },

    view_guide_child_items_list_item_img: {
        width: '100%',
        height: 300,
        marginBottom: 12,
        flex: 1,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    view_guide_child_items_list_item_img_child: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    view_guide_child_items_list_item_routing_btn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        backgroundColor: '#CCDD53',

    },
    view_guide_child_items_list_item_routing_btn_text: {
        fontSize: 15,
        fontWeight: '700',
        color: '#ffffff',
    },
    view_guide_child_items_list_item_video_box: {
        marginBottom: 24,
    },
    view_guide_child_items_list_item_info_title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1D1E',
        marginBottom: 8,
    },
    view_guide_child_items_list_item_info_text: {
        fontSize: 16,
        fontWeight: '400',
        color: '#333435',
    },
    view_guide_read_more_btn: {
        marginTop: 10,
    },
    view_guide_read_more_btn_text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1C1D1E',
        textDecorationLine: 'underline',
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
        marginBottom: 20
    },
    denied_btn: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        backgroundColor: '#CCDD53',
    },
    denied_btn_text: {
        fontSize: 15,
        fontWeight: '700',
        color: '#ffffff',
    }
});
