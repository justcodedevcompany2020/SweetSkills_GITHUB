import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import Footer from '../../includes/Footer';
import BackCoursesIcon from  '../../../../assets/svg/backCoursesIcon';


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

function Courses (props) {

    const context = useContext(AuthContext);

    // const courses = [
    //     {
    //         step: 1,
    //         title: 'Капкейки “Красный бархат”',
    //         info: 'Подробный видео-урок по приготовлению Капкейков "Красный Бархат" ...',
    //     },
    //     {
    //         step: 2,
    //         title: 'Капкейки “Красный бархат”',
    //         info: 'Подробный видео-урок по приготовлению Капкейков "Красный Бархат" ...',
    //     },
    //     {
    //         step: 3,
    //         title: 'Капкейки “Красный бархат”',
    //         info: 'Подробный видео-урок по приготовлению Капкейков "Красный Бархат" ...',
    //     },
    //
    //     {
    //         step: 4,
    //         title: 'Капкейки “Красный бархат”',
    //         info: 'Подробный видео-урок по приготовлению Капкейков "Красный Бархат" ...',
    //     },
    //     {
    //         step: 5,
    //         title: 'Капкейки “Красный бархат”',
    //         info: 'Подробный видео-урок по приготовлению Капкейков "Красный Бархат" ...',
    //     },
    //
    //
    //
    // ];

    const [guides, setGuides] = useState([]);
    const [course_id2, setCourseId] = useState('');


    const redirectToTrainingScreen = () => {
        props.navigation.navigate('MyTrainingScreen')
    }
    const redirectToViewGuideSinglePage = (id) => {
        props.navigation.navigate('ViewGuideSinglePageScreen', {
            course_id: course_id2,
            guides_id: id,
            from_page: 'Courses'
        })

    }

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            getAllCourses()
        });

        return unsubscribe;
    }, [props.navigation])



    const getAllCourses = async () => {


        let userToken = await AsyncStorage.getItem('userToken');
        let course_id = props.route.params.course_id
        setCourseId(course_id)

        console.log(course_id, 'id')

        try {

            fetch('https://sweetskills.cc/api/courses/'+ course_id, {
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

                console.log(response, 'courses')

                if (response.hasOwnProperty('status')) {
                     if (response.status == 'ok') {
                            setGuides(response.guides)
                     }
                }


            })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.courses_header}>
                <TouchableOpacity style={styles.courses_header_back_btn} onPress={() => redirectToTrainingScreen()}>
                    <BackCoursesIcon/>
                </TouchableOpacity>
                <Text style={styles.courses_header_title}>Курс</Text>
            </View>



            <ScrollView style={styles.courses_wrapper}>
                    <Text style={styles.courses_wrapper_child_title}>Домашний кондитер</Text>
                    <View style={styles.courses_wrapper_child_items_list_wrapper}>
                        {guides.map((item, index) => {

                            return(
                                <TouchableOpacity key={index} style={styles.courses_child_items_list_item} onPress={() => redirectToViewGuideSinglePage(item.guide_id)}>
                                    <View style={styles.courses_child_items_list_item_img}>
                                        <Text style={styles.courses_child_items_list_step_info}>{index + 1}</Text>
                                    </View>
                                    <View style={styles.courses_child_items_list_item_title_info_wrapper}>
                                        <Text style={styles.courses_child_items_list_item_title}>{item.title}</Text>
                                        <Text style={styles.courses_child_items_list_item_info}>{item.description}</Text>
                                    </View>

                                </TouchableOpacity>
                            )

                        })}
                    </View>

            </ScrollView>

            <Footer active_page={'training'} navigation={props.navigation}/>

        </SafeAreaView>
    );
}

export default Courses;


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

    courses_header: {
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
    courses_header_title: {
        fontSize: 17,
        fontWeight: '500',
        color: '#1C1D1E',
        textAlign: 'center'
    },

    courses_header_back_btn: {
        position: 'absolute',
        left: 8,
        top: 0,

    },
    courses_wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingHorizontal: 16,
    },
    courses_wrapper_child_title: {
        marginBottom: 16,
        color: '#1C1D1E',
        fontSize: 20,
        fontWeight: '700',
    },

    courses_wrapper_child_items_list_wrapper: {
        width: '100%',
    },
    courses_child_items_list_item: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    courses_child_items_list_item_img: {
        width: 40,
        height: 64,
        backgroundColor: '#F2F3F4',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    courses_child_items_list_step_info: {
        fontWeight: '600',
        fontSize: 28,
        color: '#6B7683'
    },
    courses_child_items_list_item_title_info_wrapper: {
        flex: 1,
    },
    courses_child_items_list_item_title: {
        fontWeight: '700',
        fontSize: 15,
        color: '#1C1D1E',
        marginBottom: 2,
    },
    courses_child_items_list_item_info: {
        fontWeight: '400',
        fontSize: 12,
        color: '#6B7683'
    },
});
