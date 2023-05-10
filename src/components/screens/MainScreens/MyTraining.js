import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import Footer from '../../includes/Footer';

import SearchIcon from  '../../../../assets/svg/searchIcon';
import SearchInputIcon from  '../../../../assets/svg/searchInputIcon';


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

function MyTraining (props) {


    const [search_input_show, setSearchInputShow] = useState(false);
    const [search_input, setSearchInput] = useState('');
    const [courses, setCourses] = useState([]);
    const [courses_error, setCoursesError] = useState(false);
    const [courses_error_text, setCoursesErrorText] = useState('');

    const [guides, setGuides] = useState([]);


    const context = useContext(AuthContext);

    // const guides = [
    //     {
    //         img: require('../../../../assets/images/training_img1.png'),
    //         title: 'Капкейки “Красный бархат”',
    //         info: 'Подробный видео-урок по эскимо с новогодним оформлением. Две начинки: ...',
    //     },
    //     {
    //         img: require('../../../../assets/images/training_img2.png'),
    //         title: 'Новогодние “Кейк-попсы”',
    //         info: 'Подробный видео-урок по эскимо с новогодним оформлением. Две начинки: ...',
    //     },
    //
    // ];
    // const courses = [
    //     {
    //         img: require('../../../../assets/images/training_img1.png'),
    //         title: 'Капкейки “Красный бархат”',
    //         info: 'Подробный видео-урок по эскимо с новогодним оформлением. Две начинки: ...',
    //     },
    //     {
    //         img: require('../../../../assets/images/training_img2.png'),
    //         title: 'Новогодние “Кейк-попсы”',
    //         info: 'Подробный видео-урок по эскимо с новогодним оформлением. Две начинки: ...',
    //     },
    //     {
    //         img: require('../../../../assets/images/training_img3.png'),
    //         title: 'Бенто-торт “Молочный ломтик”',
    //         info: 'Подробный видео-урок по эскимо с новогодним оформлением. Две начинки: ...',
    //     },
    //
    // ];



    const redirectToCoursesScreen = (id) => {
        console.log(id, 'iiid')
        props.navigation.navigate('CoursesScreen', {
            course_id: id
        })
    }
    const redirectToViewGuidesScreen = (id) => {
        props.navigation.navigate('ViewGuideSinglePageScreen', {
            from_page: 'Guides',
            guides_id: id
        })
    }
    const showSearchBox = () => {
        setSearchInputShow(true)
    }

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            getAllLessons()
        });

        return unsubscribe;
    }, [props.navigation])



    const getAllLessons = async () => {


        let userToken = await AsyncStorage.getItem('userToken');


        console.log(userToken, 'token')

        try {

            fetch('https://sweetskills.cc/api/lessons', {
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

                console.log(response, 'lessons')
                if (response.hasOwnProperty('status')) {
                    if (response.status == 'ok') {
                        if (response.courses !== null) {
                            setCourses(response.courses)
                        }
                        if (response.guides !== null) {
                            setGuides(response.guides)
                        }
                        if (response.guides === null && response.courses === null) {
                            setCoursesError(true)
                            setCoursesErrorText('Нет никакого курса или руководства')
                        }

                    }
                }


            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.my_training_header}>
                <Text style={styles.my_training_header_title}>Мое обучение</Text>
                {search_input_show &&
                <View style={styles.search_box}>
                    <View style={styles.search_input_icon_wrapper}>
                        <View style={styles.search_input_icon}>
                            <SearchInputIcon/>
                        </View>
                        <TextInput
                            style={[styles.search_input_field]}
                            onChangeText={(val) => setSearchInput(val)}
                            value={search_input}
                            placeholder='Поиск'
                            placeholderTextColor='#6B7683'
                        />
                    </View>
                    <TouchableOpacity style={styles.search_cancel_btn} onPress={() => setSearchInputShow(false)}>
                        <Text style={styles.search_cancel_btn_text}>Отмена</Text>
                    </TouchableOpacity>
                </View>
                }
                {!search_input_show &&
                <TouchableOpacity style={styles.search_btn}  onPress={() => showSearchBox()}>
                    <SearchIcon/>
                </TouchableOpacity>
                }

            </View>

            <ScrollView style={styles.my_training_wrapper}>

                {courses_error &&
                    <Text style={{color: '#DD5353', fontSize: 16, fontWeight: '500', textAlign:'center', marginTop: 100}}>{courses_error_text}</Text>
                }

                {guides.length != 0 &&
                     <View style={styles.my_training_child}>
                    <Text style={styles.my_training_child_title}>Гайды</Text>
                    <View style={styles.my_training_child_items_list_wrapper}>
                        {guides.map((item, index) => {
                            return(
                                <TouchableOpacity key={index} style={styles.my_training_child_items_list_item} onPress={() => redirectToViewGuidesScreen(item.guide_id)}>
                                    <View style={styles.my_training_child_items_list_item_img}>
                                        <Image source={{uri: item.img}}  style={styles.my_training_child_items_list_item_img_child}/>
                                    </View>
                                    <View style={styles.my_training_child_items_list_item_title_info_wrapper}>
                                        <Text style={styles.my_training_child_items_list_item_title}>{item.title}</Text>
                                        <Text style={styles.my_training_child_items_list_item_info}>{item.description}</Text>
                                    </View>

                                </TouchableOpacity>
                            )

                        })}
                    </View>
                </View>
                }
                {courses.length != 0  &&
                    <View style={styles.my_training_child}>
                        <Text style={styles.my_training_child_title}>Курсы</Text>
                        <View style={styles.my_training_child_items_list_wrapper}>
                            {courses.map((item, index) => {
                                console.log(item)
                                return(
                                    <TouchableOpacity key={index} style={styles.my_training_child_items_list_item} onPress={() => redirectToCoursesScreen(item.course_id)}>
                                        <View style={styles.my_training_child_items_list_item_img}>
                                            <Image source={{ uri: item.img}}  style={styles.my_training_child_items_list_item_img_child}/>
                                        </View>
                                        <View style={styles.my_training_child_items_list_item_title_info_wrapper}>
                                            <Text style={styles.my_training_child_items_list_item_title}>{item.title}</Text>
                                            <Text style={styles.my_training_child_items_list_item_info}>{item.description}</Text>
                                        </View>

                                    </TouchableOpacity>
                                )

                            })}
                        </View>
                    </View>
                }

            </ScrollView>

            <Footer active_page={'training'} navigation={props.navigation}/>

        </SafeAreaView>
    );
}

export default MyTraining;


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

    my_training_header: {
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
    my_training_header_title: {
        fontSize: 17,
        fontWeight: '500',
        color: '#1C1D1E',
        textAlign: 'center'
    },

    search_btn: {
      position: 'absolute',
       right: 10,
       top: 0,
    },
    my_training_wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingHorizontal: 16,
    },

    search_box: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',


    },
    search_input_icon_wrapper: {
        paddingHorizontal: 12,
        backgroundColor: '#EAECEE',
        flexDirection: 'row',
        alignItems: 'center',
        height: 46,
        marginRight: 11,
        marginTop: 20,
        width: '82%',

    },
    search_input_field: {
        color: '#1C1D1E',
        fontSize: 16,
        fontWeight: '400',
        width: '90%',
    },
    search_input_icon: {
        marginRight: 8,
    },


    search_cancel_btn_text: {
        fontSize: 16,
        fontWeight: '400',
        color: '#1C1D1E',
        textAlign: 'center'
    },
    search_cancel_btn: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',

        position: 'relative',
        top: 10

    },
    my_training_child: {
        width: '100%',

    },
    my_training_child_title: {
        marginBottom: 16,
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1D1E',

    },
    my_training_child_items_list_item: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    my_training_child_items_list_item_img: {
        width: 64,
        height: 64,
        marginRight: 12,
    },
    my_training_child_items_list_item_img_child: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    my_training_child_items_list_item_title: {
        fontWeight: '700',
        fontSize: 15,
        color: '#1C1D1E',
        marginBottom: 2,
    },
    my_training_child_items_list_item_info: {
        fontWeight: '400',
        fontSize: 12,
        color: '#6B7683',

    },
    my_training_child_items_list_wrapper: {
        width: '100%'
    },
    my_training_child_items_list_item_title_info_wrapper: {
        flex: 1
    }
});
